import React, {useState, useEffect, useRef, useContext} from 'react';
import {axiosGetRequest, axiosPostRequest} from '../services/api_service'


const useAuth = (updateCartDispatch) => {

    const [authUser, setAuthUser] = useState({name: "no name", home_state: "no_state"})

    // I need this funtion to update carState once session expired
    const hasValidSessionHook = () => {
        if (sessionStorage.getItem("sessionData") === null) {
            return false
        } else {
            return JSON.parse(sessionStorage.sessionData).exp*1000 > Date.now()
        }
    }



    const verifySessionWithBEHook = async (path) => {
        const verify_session_url = "/auth/verify"
        try {
             const response = await axiosGetRequest(verify_session_url)
             //you dont really need the response data
             const data = response.data
             if (response.status < 300) {
              
              console.log("uAH:  VERIFY SESSION - SESSION ACTIVE - SET message", path)
              await updateCartDispatch({
                  type: "UPDATE_MESSAGE", 
                  payload: {
                    user_message: `AS Hook: ${path} Cookie Session Token OK `
                  }
                })
              return {status: response.status, data: data.session, message: null}
            } else {
              //console.log("AS: VERIFY SESSION - PROBLEM STATUS ", response.status)
              await updateCartDispatch({
                  type: "UPDATE_MESSAGE", 
                  payload: {
                    user_message: `uAH:  PROBLEM  - ${path} - No Cookie Session Token`
                  }
                })
              return {status: response.status, data: data, message: null}
            }
        } catch(error) {
             console.error("uAH: Hook VERIFY SESSION - NO SESSION - SET message", path)
             await updateCartDispatch({
              type: "UPDATE_MESSAGE", 
              payload: {
                user_message: `uAH: ERROR - ${path} - No Cookie Session Token`
              }
            })
             return {status: error.response.status, data: null, message: error.response.data}
        }
    }

    const handleLoginHook = async (login, password) => {
    
        const login_url = "/auth/login"
        const loginPayload = JSON.stringify({ userid: login, password})
    
        try {
    
            const response = await axiosPostRequest(login_url , loginPayload)
            const body = await response.data
            //console.log("LOGIN response body is  ", body)
            await sessionStorage.setItem('sessionData', JSON.stringify(body.data));

            await setAuthUser({
                name: body.data.name, 
                home_state: body.data.home_state
            })
    
    
            updateCartDispatch({
                type: "SET_CUSTOMER_DETAILS", 
                payload: body.data          
            })
    
            return {'status':'success', 'message':body.message}
            
    
       } catch(error) {
            console.log("uAH: User Failed to Log In - Axios ERROR.")
            console.log(JSON.stringify(error.response.data))
            const loginError = new Error(error.response.data.message)
            throw loginError
       }
    
    
      };
     


    const handleLogoutHook = async () => {

        //call backend logout endpoint to clear cookies
        const logout_url = "/auth/logout"
        const user = await sessionStorage.getItem('sessionData')
        if (!user) {
            console.log("uAH: No user in session data -----------")
            return  {'status':'fail', 'message':'Cannot Logout - no user in session data'}     
        }
        const logoutPayload = {user}
    
    
        //this should be status saved and three tries
        //this will suceed even if cookies are missing, as the BE just sets a new expired cookie
        //same with clearing user in CartState
        try {
            const response = await axiosPostRequest(logout_url, logoutPayload)
            const body = await response.data
            //console.log("LOGOUT response body is ", body)   
              
            await setAuthUser({name: "no name", home_state: "no_state"})
    
            //clear user info in CartState
            console.log("uAH: Clearing Cart and Session Storage-----------")
    
            updateCartDispatch({
                type: "SET_CUSTOMER_DETAILS", 
                payload: {
                    home_state: null,
                    user_uuid: null
                }          
            })
            await sessionStorage.clear();
    
            return {'status':'success', 'message':body.message}        
    
    
        } catch(error) {
            console.log("uAH Error: Logout failed with: " + JSON.stringify(error.response.data))
            // no place to return message
            return {'status':'fail', 'message':error.response.data}
        }
    
    }

    return {
        authUser, 
        setAuthUser,
        hasValidSessionHook,
        verifySessionWithBEHook,
        handleLogoutHook,
        handleLoginHook
    }
}

export default useAuth









