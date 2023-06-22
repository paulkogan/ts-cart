import React, {useState, useEffect, useContext} from 'react';
import {handleLogin} from '../../services/auth_service'
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
    const [loginState, setLoginState] = useState("none")
    const {cartState, updateCartDispatch}   = useContext(CartStateContext);
    const navigate = useNavigate(); 


    //this should run once on pageload
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
            console.log("LOGIN STATE IS : "+loginState)
            console.log("cart user is IS : "+JSON.stringify(cartState))
            if (loginState == "none") {
                setInitialMessage()  
            }
                                
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
        handleLogin(loginObj.email, loginObj.password, updateCartDispatch)
        .then( async (response) => {           
                if (response) {
                    const destPage = sessionStorage.getItem("lastPage") || "/cart"
                    await setLoginState('success');
                    // setUserMessage(response.message)
                    console.log("SUCCESS - REDIRECTING after LOGIN: "+destPage)
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
                

        }).catch(err => {      //handleLogin return error
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

            <div className="login-messages">
                <div>Login State: {loginState}</div>
            </div> 

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
