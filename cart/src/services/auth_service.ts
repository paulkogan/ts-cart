
import {axiosGetRequest, axiosPostRequest} from '../services/api_service'


export const verifySessionWithBE = async () => {

      const verify_session_url = "auth/verify"
      try {
           const response = await axiosGetRequest(verify_session_url)
           //you dont really need the response data
           const data = response.data
           if (response.status < 300) {
            
            console.log("AS: VERIFY SESSION - SESSION ACTIVE ", data)
            return {status: response.status, data: data.session, message: null}
          } else {
            console.log("AS: VERIFY SESSION - PROBLEM STATUS ", response.status)
            return {status: response.status, data: data, message: null}
          }
      } catch(error:any) {
           console.error("AS: VERIFY SESSION - NO SESSION ", error)
           return {status: error.response.status, data: null, message: error.response.data}
      }
}



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
    const logoutPayload = {user}


    //this should be status saved and three tries
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
        console.log("Logout failed with" + JSON.stringify(error.response.data))
        return {'status':'fail', 'message':error.response.data}
    }

}

export const handleLogin = async (login: string, password: string, updateCartDispatch: any) => {
    
    const login_url = "auth/login"
    const loginPayload = JSON.stringify({ userid: login, password})

    try {

        const response = await axiosPostRequest(login_url , loginPayload)
        const body = await response.data
        console.log("LOGIN response body is  ", body)
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
