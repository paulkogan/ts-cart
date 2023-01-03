import React, {useState, useEffect} from 'react';
import {User} from "../types/types"
import './Admin.css';
import RegisterUserForm from './RegisterUserForm';
import UserList from './UserList';



const UserAdmin:React.FC = () => {

  const [userMessage, setUserMessage] = useState("Please enter user reg info.")
  const [userList, setUserList] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetch_url = "http://localhost:3001/users"

    const fetchBEData = async (url: string) => {
      setIsLoading(true)
      try {
           const response= await fetch(url)
           const body = await response.json()
           const data = body.data
           console.log("FETCH BODY: ", data)
           setUserList(data)
           setIsLoading(false)
      } catch(error) {
           console.log("Error!: failed to fetch user list data", error)
      }
   }

    //need to fetch inside useEffect (or useCallback)
    return () => {
        console.log("Cart SETUP runs once!")
        if (userList.length === 0) {
              console.log("Fetching BE users!")
              fetchBEData(fetch_url)               
        }
    }

  }, []) // pass in a dependency array
  


  return (
    <div>
      
      <div className="cart-inner">
        <h2>User Admin</h2>
        <div className="admin-left">    
            {isLoading ? <div> PLEASE WAIT - USERS LOADING !!!</div> : 
            <div>
                  <UserList itemList = {userList}/>
            </div> 
        
            }
        </div>


        <div className="cart-right">
        <div>MESSAGE: {userMessage}</div>     
          <div className="admin-app-2">
            <RegisterUserForm />
          </div>
        </div>


      </div>
    </div>
  );
}

export default UserAdmin;
