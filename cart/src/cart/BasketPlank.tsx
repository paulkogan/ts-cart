import React from 'react';
import {OrderItem} from "../types/types"
import {toDollarString} from "../utils"
import './Cart.css';

interface Props {
  item: OrderItem
}

const  BasketPlank:React.FC <Props> = ({item}) => {
      return (
          <div className="selected-plank" >
              <div className="selected-plank-img">
                    <img className="selected-img" src={item.image_url}></img>
              </div>
              <div className="z-plank-info">
                  <div className="z-plank-item">{item.name}</div>
                  <div className="z-plank-item">Inventory: {item.inventory}</div> 
                  <div className="z-plank-item">Unit Price: {toDollarString(item.price)}</div>
                  <div className="z-plank-item"> Num. Units: {item.num_units} </div>
                  <div className="z-plank-item"> Units Total: {toDollarString(item.cost)} </div>
                  <div className="z-plank-item"> Tax:  {toDollarString(item.tax)} </div> 
                  <div className="z-plank-item"> Total:  {toDollarString(item.cost + item.tax)}</div> 
                  
              </div>


          </div>
      )
  }



export default BasketPlank;
