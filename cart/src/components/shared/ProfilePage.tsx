
import React, {useState, useEffect, useContext} from 'react';
import {axiosGetRequest} from '../../services/api_service'
import {expToRemainingHMS} from '../../utils'
import '../App.css';

const ProfilePage: React.FC = () => {
    const [sessionData, setSessionData] = useState({})
    const [expTime, setExpTime] = useState("no exp data")

    //this should be in the auth service
    useEffect(() => {
        const verify_session_url = "auth/verify"
        const verifySession = async () => {
    
          try {
    
               const response = await axiosGetRequest(verify_session_url)
               const data = response.data
               console.log("SESSION COOKIE VERIFY RESPONSE: ", response)
               setSessionData(data)
          } catch(error) {
               console.log("Error on PROFILE PAGE: failed to verify session cookie data", error)
          }
       }
    
    
        //need to fetch inside useEffect (or useCallback)
        return () => {
            console.log("Verifying Cookie Data on BE")
            verifySession()                      
        }
    
      }, []) 

      useEffect(() => { 
        const interval = setInterval(() => {
          setExpTime(expToRemainingHMS(JSON.parse(sessionStorage.decodedToken).exp))
        }, 1000);   
        return () => clearInterval(interval);

      }, [])

      return (
        <div>
          
          <div className="app-outer">
            <h2>Profile Page</h2>
            <div>SessionData from /verify: {JSON.stringify(sessionData)}</div>

    
    
            {sessionStorage.decodedToken && 
                <div>
                  <div>Decoded Token Name: {JSON.parse(sessionStorage.decodedToken).name}</div> 
                  <div>Exp Time {sessionStorage.expDisplayTime}</div>
                  <div>Session {expTime}</div>
    
    
                </div>
            }
       

    
          </div>
        </div>
      );




}

export default ProfilePage