
import {axiosGetRequest, axiosPostRequest} from '../services/api_service'


export const verifySessionWithBE = async () => {

      const verify_session_url = "auth/verify"
      try {
           const response = await axiosGetRequest(verify_session_url)
           const data = response.data
           if (response.status < 300) {
            
            console.log("AS: VERIFY SESSION BE RESPONSE: ", data)
            return {status: response.status, data: data.session, message: null}
          } else {
            console.log("AS: PROBLEM with VERIFY SESSION BE RESPONSE: ", response.status)
            return {status: response.status, data: data, message: null}
          }
      } catch(error:any) {
           console.error("AS: VERIFY SESSION error", error)
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
    //no backend call yet for logout
    //const logout_url = "auth/logout"

    try {

        //clear user info in CartState
        updateCartDispatch({
            type: "SET_CUSTOMER_DETAILS", 
            payload: {
                home_state: null,
                user_uuid: null
            }          
        })
        await sessionStorage.clear();
        console.log("Clearing Session Storage-----------")

        //TODO: clear cookies with key = tsToken
        return {'status':'success', 'message':"body.message"}   

    } catch(error:any) {
        console.log("User Failed to LogOut - Axios ERROR."+ JSON.stringify(error.response.data))
        const logoutError = new Error(error.response.data.message)
        throw logoutError

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
