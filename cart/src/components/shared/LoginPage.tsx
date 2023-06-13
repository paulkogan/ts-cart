import React, {useState, useEffect, useContext} from 'react';
import {handleLogin} from '../../services/auth_service'
import {CartStateContext}  from '../../hooks/CartStateContext' 
import { Navigate, useNavigate, useLocation } from "react-router-dom"; 
//const history = useHistory();

const initialLoginObj = {
    email: "",
    password: "",
}


const LoginPage: React.FC = () => {

    const [loginObj, setLoginObj] = useState(initialLoginObj)
    const [loginState, setLoginState] = useState("none")
    /*
loginState:
    none
    in_progress
    success
    error

*/
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
        //handle login responds with {status, message}
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
                    setUserMessage('something went wrong')
                }
                

        }).catch(err => {      //handleLogin return error
            console.log("LOGIN PAGE ERROR: "+err.message)
            setLoginState("error");
            setUserMessage(err.message || 'no message')
        });
    
    };



    return (
        <div>
            <div>Message: {userMessage}</div>
            <div>Login State: {loginState}</div>
            <div>
                <input
                    type="text"
                    placeholder = "username"
                    name = "email"
                    onChange = {(e) => doChange(e.target.name, e.target.value) }                
                />

                <input
                    type="text"
                    placeholder = "password"
                    name = "password"
                    onChange = {(e) => doChange(e.target.name, e.target.value) }                
                />
            </div>

            <div>
               <button onClick={handleSubmit}>Login</button>
            </div>  

        
        </div>

    )

}

export default LoginPage
