
import React, {useState, useEffect, useReducer, useContext} from 'react';
import jwt from 'jwt-decode';
import {axiosPostRequest} from '../services/api_service'


export const SessionContext = React.createContext({});

export const handleLogin = async (login: string, password: string, updateCartDispatch: any) => {
    
    const login_url = "users/login"
    const loginPayload = JSON.stringify({ userid: login, password})

    try {

        const response = await axiosPostRequest(login_url , loginPayload)
        const body = await response.data
        console.log("LOGIN response body is  ", body)
        console.log("LOGIN response status is  ", response.status)
   
        let data = body.data
        let user = data.user
        let token = data.token
        await sessionStorage.setItem('sessionToken', token);
        await sessionStorage.setItem('decodedToken', JSON.stringify(jwt(token)));
        await sessionStorage.setItem('user', JSON.stringify(user));
        updateCartDispatch({
            type: "SET_CUSTOMER_DETAILS", 
            payload: user           
        })

        return {'status':'success', 'message':body.message}
        

   } catch(error:any) {
        console.log("Error!: Axios ERROR.")
        console.log(JSON.stringify(error.response.data))
        return {'status':'error', 'message':error.response.data.message}
   }


  };
