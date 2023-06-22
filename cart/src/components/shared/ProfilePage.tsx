
import React, {useState, useEffect, useContext} from 'react';
import {axiosGetRequest} from '../../services/api_service'
import {verifySessionWithBE} from '../../services/auth_service'
import {CartStateContext}  from '../../hooks/CartStateContext'
import {expTimeInHMS} from '../../utils'
import '../App.css';

const ProfilePage: React.FC = () => {
    const [verifyData, setVerifyData] = useState({})
    const [expTime, setExpTime] = useState("no exp data")
    const {cartState, updateCartDispatch}   = useContext(CartStateContext);

    //this should be in the auth service
    useEffect(() => {

        const profileVerifySession = async () => {
    
          try {
    
               const response = await verifySessionWithBE()
               console.log("Profile Page: SESSION COOKIE VERIFY RESPONSE: ", response)
               setVerifyData(response.data)
          } catch(error) {
               console.log("Error on PROFILE PAGE: failed to verify session cookie data", error)
          }
       }
  
        return () => {
            console.log("Profile Page: Verifying Cookie Data on BE")
            profileVerifySession()                      
        }
    
      }, []) 

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
            <div>Response from BE verify: {JSON.stringify(verifyData)}</div>
            <div>Cart State: {cartState.delivery_us_state || 'none'}</div>

    
    
            {sessionStorage.sessionData && 
                <div>
                  <div>SessionData Name: {JSON.parse(sessionStorage.sessionData).name}</div> 
                  <div>Session {expTime}</div>
    
    
                </div>
            }
       

    
          </div>
        </div>
      );




}

export default ProfilePage