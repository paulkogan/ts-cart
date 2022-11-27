import React, {useState, useEffect} from 'react';
//import useLocalStorage from './hooks/useLocalStorage'

const initialLoginObj = {
    email: "",
    password: "",
}

const initialUserDetails = {
    user_uuid: null,
    email: "",
    name: "",
    avatar: ""

}

/*
validationState:
    none
    in_progress
    success
    error

*/


const LoginPage: React.FC = () => {
    const [loginObj, setLoginObj] = useState(initialLoginObj)
    const [loginState, setLoginState] = useState("none")
    const [loginMessage, setLoginMessage] = useState("Please login.")
    const [userDetails, setUserDetails] = useState(initialUserDetails)

    const doChange = (fieldName:string, fieldValue: string | null ):void => {
        setLoginObj({
            ...loginObj, 
            [fieldName]:fieldValue
        })
    };

    const handleSubmit = async () => {
        // start with just finding user
        const find_user_url = "http://localhost:3001/login/find_user"
        setLoginState("in_progress")

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginObj.email })
        };

        try {
            const response= await fetch(find_user_url, requestOptions)
            const data = await response.json()
            // console.log("response status ", response.status)
            // console.log("DATA is  ", data)
            if (response.status > 300) {
                setLoginState("error")
                setLoginMessage(data.message)

            } else {
                setLoginState("success")
                setLoginMessage(`Success! User: ${data.email} is logged in`)
                await setUserDetails({...userDetails,
                    email: data.email,
                    name: data.name
                })


            }

       } catch(error) {
            console.log("Error!: failed to find user email", error)
       }

    };



    return (
        <div>
            <div> Login Page</div>
            <div>{loginMessage}</div>
            <br/>
            <div> 
                {loginState === "success" && 
                    <div>
                        { "User is:"+ userDetails.email}<br/>
                    </div>
                }
            </div>



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
               <button onClick={handleSubmit}>Update</button>
            </div>  

        
        </div>

    )

}

export default LoginPage


// <div>{loginObj.email}..{loginObj.password}</div>

