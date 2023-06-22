
import React, {useState, useEffect, useContext} from 'react';
import {verifySessionWithBE, hasValidSession} from '../../services/auth_service'
import {CartStateContext}  from '../../hooks/CartStateContext'
import {expTimeInHMS} from '../../utils'
import '../App.css';

const ProfilePage: React.FC = () => {
    const [expTime, setExpTime] = useState("no exp data")
    const {cartState, updateCartDispatch}   = useContext(CartStateContext);

    // doing it here as an exception on an unprotercted page
    useEffect(() => {
        const profileVerifySession = async () => {  
          try {  
               await verifySessionWithBE("profilePage", updateCartDispatch)

          } catch(error) {
               // this does not return error 
               console.error("Error on PROFILE PAGE: failed to verify session cookie data", error)
          }
       }
  
        return () => {
            profileVerifySession()                      
        }
    
      }, []) 

      // update expiration timer
      useEffect(() => { 
        if(sessionStorage.sessionData) {
          const interval = setInterval(() => {
            setExpTime(expTimeInHMS(JSON.parse(sessionStorage.sessionData).exp))
          }, 1000);   
          return () => clearInterval(interval);
        }
      }, [])

      return (
        <div>
          
          <div className="app-outer">
            <h2>Profile Page</h2>
            <div>Session Data: {hasValidSession() ? "VALID for " + JSON.parse(sessionStorage.sessionData).name : "NO SESSION - Please log in"}</div>
            <div>Session {expTime}</div>
            <div>Cart State: {cartState.delivery_us_state || 'none'}</div>
            <div>Verify Cookies Status: {'TBD'}</div>
                
          </div>
        </div>
      );




}

export default ProfilePage