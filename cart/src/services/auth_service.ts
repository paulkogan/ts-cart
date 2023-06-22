
import {axiosGetRequest, axiosPostRequest} from '../services/api_service'


export const verifySessionWithBE = async (path:string, updateCartDispatch:any) => {

      const verify_session_url = "auth/verify"
      try {
           const response = await axiosGetRequest(verify_session_url)
           //you dont really need the response data
           const data = response.data
           if (response.status < 300) {
            
            //console.log("AS: VERIFY SESSION - SESSION ACTIVE ", data)
            await updateCartDispatch({
                type: "UPDATE_MESSAGE", 
                payload: {
                  user_message: `AS: ${path} Cookie Session Token OK `
                }
              })
            return {status: response.status, data: data.session, message: null}
          } else {
            //console.log("AS: VERIFY SESSION - PROBLEM STATUS ", response.status)
            await updateCartDispatch({
                type: "UPDATE_MESSAGE", 
                payload: {
                  user_message: `AS: PROBLEM  - ${path} - No Cookie Session Token`
                }
              })
            return {status: response.status, data: data, message: null}
          }
      } catch(error:any) {
           //console.error("AS: VERIFY SESSION - NO SESSION ", error)
           await updateCartDispatch({
            type: "UPDATE_MESSAGE", 
            payload: {
              user_message: `AS: ERROR - ${path} - No Cookie Session Token`
            }
          })
           return {status: error.response.status, data: null, message: error.response.data}
      }
}


// I need this funtion to update carState once session expired
export const hasValidSession= ():Boolean => {
    if (sessionStorage.getItem("sessionData") === null) {
        return false
    } else {
        return JSON.parse(sessionStorage.sessionData).exp*1000 > Date.now()
    }
}



export const handleLogout = async (updateCartDispatch:any) => {

    //call backend logout endpoint to clear cookies
    const logout_url = "auth/logout"
    const user = await sessionStorage.getItem('sessionData')
    if (!user) {
        console.log("No user in session data -----------")
        // need to set this in cart message
        //nothing to return to
        //return {'status':'fail', 'message': "No session info found"}     
    }
    const logoutPayload = {user}


    //this should be status saved and three tries
    //this will suceed even if cookies are missing, as the BE just sets a new expired cookie
    //same with clearing user in CartState
    try {
        const response = await axiosPostRequest(logout_url, logoutPayload)
        const body = await response.data
        console.log("LOGOUT response body is ", body)   
          
        //clear user info in CartState
        console.log("Clearing Cart and Session Storage-----------")

        updateCartDispatch({
            type: "SET_CUSTOMER_DETAILS", 
            payload: {
                home_state: null,
                user_uuid: null
            }          
        })
        await sessionStorage.clear();

        return {'status':'success', 'message':body.message}        


    } catch(error:any) {
        console.log("Auth Service Error: Logout failed with: " + JSON.stringify(error.response.data))
        // no place to return message
        return {'status':'fail', 'message':error.response.data}
    }

}

export const handleLogin = async (login: string, password: string, updateCartDispatch: any) => {
    
    const login_url = "auth/login"
    const loginPayload = JSON.stringify({ userid: login, password})

    try {

        const response = await axiosPostRequest(login_url , loginPayload)
        const body = await response.data
        //console.log("LOGIN response body is  ", body)
        await sessionStorage.setItem('sessionData', JSON.stringify(body.data));


        updateCartDispatch({
            type: "SET_CUSTOMER_DETAILS", 
            payload: body.data          
        })

        return {'status':'success', 'message':body.message}
        

   } catch(error:any) {
        console.log("User Failed to Log In - Axios ERROR.")
        console.log(JSON.stringify(error.response.data))
        const loginError = new Error(error.response.data.message)
        throw loginError
   }


  };
