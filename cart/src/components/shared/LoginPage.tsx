import React, {useState, useEffect} from 'react';
import {handleLogin} from '../../services/auth_service'
  

const initialLoginObj = {
    email: "",
    password: "",
}


const LoginPage: React.FC = () => {

    const [loginObj, setLoginObj] = useState(initialLoginObj)
    const [loginState, setLoginState] = useState("none")

    const doChange = (fieldName:string, fieldValue: string | null ):void => {
        setLoginObj({
            ...loginObj, 
            [fieldName]:fieldValue
        })
    };

    const handleSubmit = async () => {

        await handleLogin(loginObj.email, loginObj.password).then(result => {
                console.log("LOGIN result is: "+result)
                if (result) {
                    setLoginState(result);
                } else {
                    setLoginState("none");
                }
        })

    };



    return (
        <div>
            <div>Login State {loginState}</div>
            <div>Login Object email: {loginObj.email}   pwrd: {loginObj.email}</div>

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
