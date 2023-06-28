import React, {useState, useRef, useContext, useEffect} from 'react';
import {User} from "../../types/types"
import './Admin.css';
import RegisterUserForm from './RegisterUserForm';
import UserList from './UserList';

import {axiosGetRequest} from '../../services/api_service'



const UserAdmin:React.FC = () => {
  const [userList, setUserList] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    const list_users_url = "/users"

    const fetchUsers = async () => {
      setIsLoading(true)
      try {
           const response = await axiosGetRequest(list_users_url)
           const data = response.data.data
           //console.log("FETCH BODY: ", data)
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
              fetchUsers()               
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
          <div className="admin-app-2">
            <RegisterUserForm />
          </div>
        </div>


      </div>
    </div>
  );
}

export default UserAdmin;

