import React, {useState, useEffect, useContext} from 'react';
import { Navigate } from "react-router-dom";
import {hasValidSession} from '../../services/auth_service'
import {verifySessionWithBE} from '../../services/auth_service'



export const ProtectedRoute = ( {children, path}:any) => {
  const [sessionState, setSessionState] = useState("waiting")

  useEffect(() => {
    const profileVerifySession = async () => {
      try {

           const response = await verifySessionWithBE()
           //console.log("protected Route: SESSION COOKIE VERIFY RESPONSE: ", response)
           if (response.status < 300) {
            setSessionState("session")
           } else {
            setSessionState("no session")
           }
           
      } catch(error) {
           //console.log("Error on PROFILE PAGE: failed to verify session cookie data", error)
           setSessionState("no session")
      }
   }

    return () => {
        profileVerifySession()                      
    }

  }, []) 


  console.log(`protected Route: ${path} sessionState is: ${sessionState}`)
  if (sessionState==="waiting") {
    return null
  } else if (sessionState==="no session") {
     sessionStorage.setItem("lastPage", path)
     return <Navigate to="/login" />;
  } else {
    return children;
  }
    
    
    
    
   
  
};

