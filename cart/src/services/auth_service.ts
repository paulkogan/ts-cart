
import React, {useState, useEffect, useReducer} from 'react';
// import {Product, OrderItem, CartState} from "../types/types"
// import './Cart.css';
// import BasketList from './BasketList';
// import ShoppingProductList from './ShoppingProductList';
// import CheckoutForm from './CheckoutForm';
// import LoginPage from './LoginPage';
//import CartUpdater from './CartUpdater';
import jwt from 'jwt-decode';
import {axiosGetRequest} from '../services/api_service'
/*
loginState:
    none
    in_progress
    success
    error

*/



export const handleLogin = async (login: string, password: string)  =>  {
    // start with just finding user
    //const [cartState, updateCartDispatch] = useReducer(CartUpdater, InitialCartState);
    const login_url = "http://localhost:3001/users/login"
    //setLoginState("in_progress")

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: login, password})
    };

    try {
        const response= await fetch(login_url , requestOptions)
        const body = await response.json()
        //console.log("response status ", response.status)
        console.log("LOGIN result body is  ", body)
        if (response.status > 300) {
            // setLoginState("error")
            // setUserMessage(body.message)
            return "error"+body.message

        } else {
            let data = body.data
            let user = data.user
            let token = data.token
            // setLoginState("success")
            // setUserMessage(`Success! User: ${user.name} is logged in`)
            const dt = await jwt(token)
            await sessionStorage.setItem('sessionToken', token);
            await sessionStorage.setItem('decodedToken', JSON.stringify(jwt(token)));
            await sessionStorage.setItem('user', JSON.stringify(user));

            //this is the real problem
            //do you pass in UpdateCartDispatch through props
            //or make it a Context provider

            // updateCartDispatch({
            //   type: "SET_customer_details", 
            //   payload: {
            //     delivery_us_state: user.home_state,
            //     user_uuid: user.user_uuid
            //    }
            // }) 
            return "success"
        }
        

   } catch(error) {
        console.log("Error!: failed to submit login info.", error)
   }


  };
