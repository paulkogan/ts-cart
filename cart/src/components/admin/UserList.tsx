import React from 'react';
import {User} from "../../types/types"
import './Admin.css';

interface Props {
  itemList: User[]
}

const  UserList:React.FC <Props> = ({itemList}) => {


  // const handleAdd = (product: Product) => {
  //     console.log("adding "+product.product_id)
  // }

  const renderUserlist = ():JSX.Element[]  => {

    return itemList.map(item => {
      return (
          <div key={item.user_uuid} className="user-list-item" >
            <span> {item.name} </span> 
            <span> {item.email}</span>
            <span> {item.home_state}</span>
          </div>
      )
    })

  }

  return (
    <div className="prod-list">
      {itemList && renderUserlist()}
    </div>
  );
}

export default UserList;
