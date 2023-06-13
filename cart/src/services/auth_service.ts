
import React, {useState, useEffect, useReducer, useContext} from 'react';
//import jwt from 'jwt-decode';
import {axiosPostRequest} from '../services/api_service'
//import moment from 'moment'


export const hasValidSession = ():Boolean => {

    if (sessionStorage.getItem("decodedToken") === null) {
        return false
    } else {
        return JSON.parse(sessionStorage.decodedToken).exp*1000 > Date.now()
    }
   

}


export const handleLogin = async (login: string, password: string, updateCartDispatch: any) => {
    
    const login_url = "users/login"
    const loginPayload = JSON.stringify({ userid: login, password})

    try {

        const response = await axiosPostRequest(login_url , loginPayload)
        const body = await response.data
        //console.log("LOGIN response body is  ", body)
        //console.log("LOGIN response status is  ", response.status)
   
        let data = body.data
        let user = data.user
        let token = data.token
        //const decoded_token = AWAIT jwt(token)
        const decoded_token = JSON.parse(atob(token.split(".")[1]))
        const expireTime = new Date(decoded_token.exp*1000);
        await sessionStorage.setItem('sessionToken', token);
        await sessionStorage.setItem('decodedToken', JSON.stringify(decoded_token));
        await sessionStorage.setItem('user', JSON.stringify(user));
        await sessionStorage.setItem('expDisplayTime', JSON.stringify(expireTime));


        updateCartDispatch({
            type: "SET_CUSTOMER_DETAILS", 
            payload: user           
        })

        return {'status':'success', 'message':body.message}
        

   } catch(error:any) {
        console.log("User Failed to Log In - Axios ERROR.")
        console.log(JSON.stringify(error.response.data))
        const loginError = new Error(error.response.data.message)
        //loginError.code = "401"
        throw loginError
        //this is wrong
        return {'status':'error', 'message':error.response.data.message}
   }


  };
