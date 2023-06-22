import React, {useState, useEffect, useContext} from 'react';
import { Navigate } from "react-router-dom";
import {verifySessionWithBE} from '../../services/auth_service'
import {CartStateContext}  from '../../hooks/CartStateContext'


export const ProtectedRoute = ( {children, path}:any) => {
  const [sessionState, setSessionState] = useState("waiting")
  const {cartState, updateCartDispatch}   = useContext(CartStateContext);

  useEffect(() => {
    const profileVerifySession = async () => {
      try {

           const response = await verifySessionWithBE("PR-"+path, updateCartDispatch)
           if (response.status < 300) {
            setSessionState("session")
           } else {
            setSessionState("no session")
           }
           
      } catch(error) {
           setSessionState("no session")
      }
   }

    return () => {
        profileVerifySession()                      
    }

  }, []) 


  //console.log(`protected Route: ${path} sessionState is: ${sessionState}`)
  if (sessionState==="waiting") {
    return null //will force reload - or return spinner
  } else if (sessionState==="no session") {
     sessionStorage.setItem("lastPage", path)
     return <Navigate to="/login" />;
  } else {
    return children;
  }
    
    
    
    
   
  
};

