import React from 'react';
import {Product} from "../types/types"
import './Admin.css';

interface Props {
  item: Product
}

const handleDelete = (item: Product) => {
   console.log("Delete "+item.name)
}


const  AdminProductPlank:React.FC <Props> = ({item}) => {

      return (
          <div className="prod-list-plank" >
              <div className="basket-plank-img">
                    <img className="prod-list-img" src={item.image_url}></img>
              </div>
              <div className="basket-plank-info">
                  <div> {item.name} </div> 
                  <div> Price: {item.price} </div>
                  <div> Inventory: {item.inventory} </div>
                  <div> {item.product_id} </div>
                  <div className="prod-list-add">
                    <button onClick={() => handleDelete(item)}>Delete</button>
                  </div> 

              </div>



          </div>
      )
  }



export default AdminProductPlank;


