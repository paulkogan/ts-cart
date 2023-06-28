import React, {useState, useEffect, useRef, useContext} from 'react';
import {CartStateContext}  from '../../hooks/CartStateContext' 
import { Navigate, useNavigate, useLocation } from "react-router-dom"; 
//const history = useHistory();

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
    const [loginState, setLoginState] = useState("none") //needed?
    const {cartState, updateCartDispatch, auth}   = useContext(CartStateContext);
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
    
      }, []) 





    const doChange = async (fieldName:string, fieldValue: string | null ) => {
        await setLoginState('in_progress')
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
                    await setLoginState('success');

                    //console.log("SUCCESS - REDIRECTING after LOGIN: "+destPage)
                    await updateCartDispatch({
                        type: "UPDATE_MESSAGE", 
                        payload: {
                          user_message: `Thank you for logging in. Redirecting to (${destPage})`
                        }
                      })
                    navigate(destPage)
                    
                } else {
                    setLoginState('error')
                    await updateCartDispatch({
                        type: "UPDATE_MESSAGE", 
                        payload: {
                          user_message: `Login Error - no response`
                        }
                      })
                    
                }
                

        }).catch((err:any) => {      //handleLogin return error
            //console.log("LOGIN PAGE ERROR: "+err.message)
            setLoginState("error");
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
