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

    const [userMessage, setUserMessage] = useState("Please login.")
    const {cartState, updateCartDispatch}   = useContext(CartStateContext);
    const navigate = useNavigate(); 


    const doChange = (fieldName:string, fieldValue: string | null ):void => {
        setLoginObj({
            ...loginObj, 
            [fieldName]:fieldValue
        })
    };

    const handleSubmit = async () => {
        handleLogin(loginObj.email, loginObj.password, updateCartDispatch)
        .then(response => {           
                if (response) {
                    const destPage = sessionStorage.getItem("lastPage") || "/cart"
                    setLoginState(response.status);
                    setUserMessage(response.message)
                    console.log("REDIRECTING after LOGIN: "+destPage)
                    navigate(destPage)
                } else {
                    setLoginState('error')
                    setUserMessage('Problematic Respondse')
                    
                }
                

        }).catch(err => {      //handleLogin return error
            console.log("LOGIN PAGE ERROR: "+err.message)
            setLoginState("error");
            setUserMessage(err.message || 'no message')
            setLoginObj({...loginObj, password: ""})
        });
    
    };



    return (
        <div className="login-outer" >

            <div className="login-messages">
                <div>Message: {userMessage}</div>
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
