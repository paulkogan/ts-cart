import React, {useState} from 'react';
import {User} from "../types/types"
import './Admin.css';


// interface Props {
//   submitAddProduct: (new_product:Product) => any;
// }
// const  RegisterUserForm:React.FC <Props> = (props) => {
//   const {submitAddProduct} = props;

const  RegisterUserForm:React.FC = () => {


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
  const [userMessage, setUserMessage] = useState("Please enter registration details.")
  const [regStatus, setRegStatus] = useState("none")

  const us_tax_states =  ["--", "NY", "FL","AZ"]

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
      //submit new registration to BE

      const register_user_url = "http://localhost:3001/users/register"

      console.log(`Submit: NewUser is: ${JSON.stringify(newUser)}`)
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            home_state: newUser.home_state
          })
      };
      
 
      try {
          const response= await fetch(register_user_url , requestOptions)
          const data = await response.json()
          console.log("response status ", response.status)
          console.log("REGISTER DATA is  ", data)
          if (response.status > 300) {
              setUserMessage(data.message)
              setRegStatus("error")

  
          } else {
              setUserMessage(`Success! Registration complete for ${data.email}`)
              setRegStatus("success")
              //reset the form
              setNewUser(getNewUserObj())
              // bit of a cheat - a bit of JSQuery - clear page fields
              Array.from(document.querySelectorAll('input')).forEach(node => {
                node.value=""
              })
          }
          
  
     } catch(error) {
          setUserMessage(`Error: failed to register user with:  ${error}`)
          console.log("Error: failed to register user with: ", error)
          setRegStatus("error")
     }

      return regStatus
  }


  return (
    <div>     
        <div className="form-message">
            <div>{userMessage} </div>
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


//   <div className="prod-input-field">
//   <select 
//         name="us_state"
//         onChange = {event => {handleChange(event.target.name, event.target.value) }}
//   >

//      {   stateOptions.map(state => <option key={state} value={state}>{state}</option>   )}
         
//   </select>
// </div>








// onChange = {handleChange}
// onChange = {(event) => {handleChange(event)}}
//   onChange={event => {
//     setnewUser({
//       ...newUser,
//       ["price"]: parseFloat(event.target.value)
//     });
// }}
// <button onClick={handleClick}>Add</button>


// {   stateOptions.forEach(state => {

//   <option value={state}>{state}</option>
//  )
// })

// }
