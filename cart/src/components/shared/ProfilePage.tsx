
import React, {useState, useEffect, useContext} from 'react';
import {axiosGetRequest} from '../../services/api_service'
import '../App.css';

const ProfilePage: React.FC = () => {
    const [sessionData, setSessionData] = useState({})



    useEffect(() => {
        const verify_session_url = "auth/verify"

        const verifySession = async () => {
    
          try {
    
               const response = await axiosGetRequest(verify_session_url)
               const data = response.data
               console.log("SESSION COOKIE VERIFY RESPONSE: ", response)
               setSessionData(data)
          } catch(error) {
               console.log("Error!: failed to verify session cookie data", error)
          }
       }
    
    
        //need to fetch inside useEffect (or useCallback)
        return () => {
            console.log("Verifying Cookie Data on BE")
            verifySession()                      
        }
    
      }, []) 

      

      return (
        <div>
          
          <div className="app-outer">
            <h2>Profile Page</h2>
            <div>SessionData: {JSON.stringify(sessionData)}</div>

    
    
            {sessionStorage.decodedToken && 
                <div>
                  <div>Decoded Token Name: {JSON.parse(sessionStorage.decodedToken).name}</div> 
                  <div>Exp Time {sessionStorage.expDisplayTime}</div>
                  <div>Session exp.: {Math.floor((JSON.parse(sessionStorage.decodedToken).exp*1000-Date.now())/1000)}</div>
    
    
                </div>
            }
       

    
          </div>
        </div>
      );




}

export default ProfilePage