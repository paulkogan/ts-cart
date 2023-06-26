
import React, {useState, useEffect, useRef, useContext} from 'react';
import {CartStateContext}  from '../../hooks/CartStateContext'
import {expTimeInHMS} from '../../utils'
import '../App.css';

const ProfilePage: React.FC = () => {
    const [expTime, setExpTime] = useState("no exp data")
    const {cartState, updateCartDispatch, auth}   = useContext(CartStateContext);
    const runRef = useRef(false);

    // doing it here as an exception on an unprotercted page
    //can we do it withou the useRef???
    useEffect(() => {
      const profileVerifySession = async () => {  
          try {  
              await auth.verifySessionWithBEHook("profilePage")

          } catch(error) {
              // this does not return error 
              console.error("Error on PROFILE PAGE - Hook: failed to verify session cookie data", error)
          }
      }

      return () => {
          //console.log(`in Profile- runRef is ${runRef.current}`)
          if (!runRef.current) {
            profileVerifySession() 
          }
          
          runRef.current = true;                      
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
            <div>Session is: {auth.hasValidSessionHook() ? "VALID for " + JSON.parse(sessionStorage.sessionData).name : "NOT VALID "}</div>
            <div>Session {expTime}</div>
            <div> Hook AuthUser {JSON.stringify(auth.authUser)}</div>
            <br/>
            <div>Session Data: {sessionStorage.sessionData}</div>
            <br/>
            <div>Cart State: {cartState.delivery_us_state || 'none'}</div>
            <div>Verify Cookies Status: {'TBD'}</div>
                
          </div>
        </div>
      );




}

export default ProfilePage