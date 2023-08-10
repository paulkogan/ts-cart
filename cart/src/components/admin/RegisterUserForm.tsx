import React, {useState, useRef, useContext, useEffect} from 'react';
import {User} from "../../types/types"
import './Admin.css';
import {axiosPostRequest} from '../../services/api_service'
import {getTaxRates} from "../../utils"
import {CartStateContext}  from '../../hooks/CartStateContext' 


const  RegisterUserForm:React.FC = () => {



  const {cartState, updateCartDispatch, auth}   = useContext(CartStateContext);
  const runRef = useRef(false);


  useEffect(() => {
    const setInitialMessage = async () => { 
        await updateCartDispatch({
            type: "UPDATE_MESSAGE", 
            payload: {
              user_message: `Add new Users here!`
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

  const getNewUserObj = () :User => {
      return {
        user_uuid: "",
        name: "",
        email: "",
        password: "",
        home_state: null, 
      }
  }
  
  const [newUser, setNewUser] = useState<User>(getNewUserObj());
  const [regStatus, setRegStatus] = useState("none")

  const us_tax_states = ["--"].concat(Object.keys(getTaxRates()));

  const handleChange = (fieldName: string, fieldValue: string | number): void => {
    if(fieldName == "home_state" && fieldValue == "--" ) {
      return 
    }

    setNewUser({
      ...newUser,
      [fieldName]: fieldValue
    })
  };

  const handleSubmit = async (): Promise<string | undefined> => {


      const register_user_url = "/users/register"
      //console.log(`Submit: NewUser is: ${JSON.stringify(newUser)}`)

      const newUserPayload = JSON.stringify({ 
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            home_state: newUser.home_state
          })
   
      
 
      try {
         const response = await axiosPostRequest(register_user_url, newUserPayload)
         const data = await response.data
          //console.log("REGISTER DATA is  ", data)
          if (response.status > 300) {
              await updateCartDispatch({
                type: "UPDATE_MESSAGE", 
                payload: {
                  user_message: `Error: failed to register user with:  ${data.message}`
                }
              })
              setRegStatus("error")

  
          } else {
              await updateCartDispatch({
                type: "UPDATE_MESSAGE", 
                payload: {
                  user_message: `Success! Registration complete for ${data.data.email}`
                }
              })

              setRegStatus("success")
              //reset the form
              setNewUser(getNewUserObj())
              // bit of a cheat - a bit of JSQuery - clear page fields
              Array.from(document.querySelectorAll('input')).forEach(node => {
                node.value=""
              })
          }
          
  
     } catch(error) {
          await updateCartDispatch({
            type: "UPDATE_MESSAGE", 
            payload: {
              user_message: `Error: failed to register user with:  ${error}`
            }
          })

          console.log("Error: failed to register user with: ", error)
          setRegStatus("error")
     }

      return regStatus
  }


  return (
    <div>     
        <div className="form-message">
            <div>{/* JSON.stringify(newUser)*/} </div>
        </div>
        {/*  updates newUser directly  - can do it both ways*/}
        <div className="prod-form">
            <div className="prod-input-field">
                <input 
                    type="text"
                    placeholder="Name"
                    onChange={event => {
                        setNewUser({
                          ...newUser,
                          ["name"]: event.target.value
                        });

                    }}
                />
            </div>

            <div className="prod-input-field">
              <input 
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange = {event => {handleChange(event.target.name, event.target.value) }}
              />
            </div>

            <div className="prod-input-field">
              <input 
                  type="text"
                  placeholder="password"
                  name="password"
                  onChange = {event => {handleChange(event.target.name, event.target.value) }}
              />
            </div>
            <div>
                <select 
                    name="home_state"
                    onChange = {event => {handleChange(event.target.name, event.target.value) }}
                    defaultValue={"..."} 
                  >
                  {us_tax_states.map((state_code: string) => <option key={state_code} value={state_code}>{state_code}</option>   )}
              
                </select>
            </div>

        </div>
        <button onClick={handleSubmit}>Register</button>
        
    </div>
  );
}

export default RegisterUserForm;


// if sending entire event
//const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

