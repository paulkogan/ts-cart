import React, {useState, useEffect, useRef, useContext} from 'react';
import {CartStateContext}  from '../../hooks/CartStateContext' 
import type {CartStateContextType} from "../../types/types"
import { useNavigate } from "react-router-dom"; 


const initialLoginObj = {
    email: "",
    password: "",
}

    /*
    loginState:
        none
        in_progress
        success
        error

*/


const LoginPage: React.FC = () => {

    const [loginObj, setLoginObj] = useState(initialLoginObj)
    const {updateCartDispatch, auth}   = useContext(CartStateContext) as CartStateContextType;
    const navigate = useNavigate(); 
    const runRef = useRef(false);

    useEffect(() => {
        const setInitialMessage = async () => { 
            const destPage = sessionStorage.getItem("lastPage") || "direct" 
            await updateCartDispatch({
                type: "UPDATE_MESSAGE", 
                payload: {
                  user_message: `Please Login (${destPage})`
                }
              })
       }
  
        return () => {
            if (!runRef.current) {
                setInitialMessage()     
            }
              
              runRef.current = true;                      
          }
    
      }, [updateCartDispatch, auth]) 





    const doChange = async (fieldName:string, fieldValue: string | null ) => {
        setLoginObj({
            ...loginObj, 
            [fieldName]:fieldValue
        })
    };

    const handleSubmit = async () => {
        auth.handleLoginHook(loginObj.email, loginObj.password)
        .then( async (response:any) => {           
                if (response) {
                    const destPage = sessionStorage.getItem("lastPage") || "/cart"

                    //console.log("SUCCESS - REDIRECTING after LOGIN: "+destPage)
                    await updateCartDispatch({
                        type: "UPDATE_MESSAGE", 
                        payload: {
                          user_message: `Thank you for logging in. Redirecting to (${destPage})`
                        }
                      })
                    navigate(destPage)
                    
                } else {
                    await updateCartDispatch({
                        type: "UPDATE_MESSAGE", 
                        payload: {
                          user_message: `Login Error - no response`
                        }
                      })
                    
                }
                

        }).catch((err:any) => {      //handleLogin return error
            //console.log("LOGIN PAGE ERROR: "+err.message)
            updateCartDispatch({
                type: "UPDATE_MESSAGE", 
                payload: {
                  user_message: `Login Error - ${err.message}`
                }
              })
            setLoginObj({...loginObj, password: ""})
        });
    
    };



    return (
        <div className="login-outer" >

            <div className="login-input-div" >
                <input
                    className="login-input-field" 
                    type="text"
                    placeholder = "username"
                    name = "email"
                    value = {loginObj.email}
                    onChange = {(e) => doChange(e.target.name, e.target.value) }                
                />

                <input
                    className="login-input-field" 
                    type="text"
                    placeholder = "password"
                    name = "password"
                    value = {loginObj.password}
                    onChange = {(e) => doChange(e.target.name, e.target.value) }                
                />
            </div>

            <div className="login-sumbit-button" >
               <button onClick={handleSubmit}>Login</button>
            </div>  

        
        </div>

    )

}

export default LoginPage
