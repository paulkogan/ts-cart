import {useState, useEffect, useRef, useContext} from 'react';
import { Navigate } from "react-router-dom";
import {CartStateContext}  from '../../hooks/CartStateContext'
import type {CartStateContextType} from "../../types/types"


export const ProtectedRoute = ( {children, path}:any) => {
  const [sessionState, setSessionState] = useState("waiting")
  const {auth}   = useContext(CartStateContext) as CartStateContextType;
  const runRef = useRef(false);

  useEffect(() => {
    const profileVerifySession = async () => {
      try {

           const response = await auth.verifySessionWithBEHook("PR-"+path)
           if (typeof response.status == 'number' && response.status < 300) {
            setSessionState("session")
           } else {
            setSessionState("no session")
           }
           
      } catch(error) {
           setSessionState("no session")
      }
   }

    return () => {
        //console.log(`in PR - runRef is ${runRef.current}`)
        if (!runRef.current) {
          profileVerifySession()
        }
        
        runRef.current = true;                      
    }

  }, [path, auth]) 






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

