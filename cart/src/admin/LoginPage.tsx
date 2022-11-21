import React, {useState, useEffect} from 'react';
//import useLocalStorage from './hooks/useLocalStorage'

const initialLoginobj = {
    userName: "",
    password: "",
    loggedIn: false

}

const initialUserDetails = {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    avatar: ""

}

const LoginPage: React.FC = () => {
    const [loginObj, setLoginobj] = useState(initialLoginobj)
    const [userLoading, setUserLoading] = useState("")
    const [userDetails, setUserDetails] = useState(initialUserDetails)

    const doChange = (fieldName:string, fieldValue: string | null ):void => {
        setLoginobj({
            ...loginObj, 
            [fieldName]:fieldValue
        })
    };

    useEffect(() => {
        const fetchUser = async (url:string) => {
            setUserLoading("loading")
            try {
                const response = await fetch(url)
                const json = await response.json()
                const userDetails = json.data[0]
                setUserDetails(userDetails)
                console.log("UserDetails", userDetails)
                setUserLoading("success")
            } catch (error) {
                console.log("Failed to fetch ", error)
                setUserLoading("error")
            }


        }
        // when password changes, check if we have the right password, and if so, fetch
        if (loginObj.password == "hello!") {
            setLoginobj({
                ...loginObj, 
                ["loggedIn"]:true
            })
            const url = "https://reqres.in/api/users?delay=3"
            fetchUser(url)
        }

    }, [loginObj.password])

    return (
        <div>
            <div> Login Page</div>
            <div>
                <input
                    type="text"
                    placeholder = "username"
                    name = "userName"
                    onChange = {(e) => doChange(e.target.name, e.target.value) }                
                />

                <input
                    type="text"
                    placeholder = "password"
                    name = "password"
                    onChange = {(e) => doChange(e.target.name, e.target.value) }                
                />
            </div>
            <div>{loginObj.userName}..{loginObj.password}</div>
            <div>
                    {loginObj.loggedIn && 

                        <div>LOGGED IN</div>
                    }
            </div>
            <div> {userDetails.id  ? 
                <div>
                   { userDetails.first_name}{ userDetails.last_name}
                </div> 
                :
                <div>NO USER DATA</div>
            }
            </div>

        </div>

    )

}

export default LoginPage




