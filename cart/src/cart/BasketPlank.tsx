import React from 'react';
import {OrderItem} from "../types/types"
import {toDollarString} from "../utils"
import './Cart.css';

interface Props {
  item: OrderItem
}

const  BasketPlank:React.FC <Props> = ({item}) => {
      return (
          <div className="basket-plank" >
              <div className="basket-plank-img">
                    <img className="basket-img" src={item.image_url}></img>
              </div>
              <div className="basket-plank-info">
                  <div className="basket-plank-item">{item.name}</div>
                  <div className="basket-plank-item">Inventory: {item.inventory}</div> 
              
                  <div className="basket-plank-cost">
                    
                    <div> Unit Price: {toDollarString(item.price)}</div>
                    <div> Num. Units: {item.num_units} </div>
                    <div> Units Total: {toDollarString(item.cost)} == {item.cost} </div>
                    <div> Tax:{toDollarString(item.tax)} == {item.tax}</div> 
                    <div> Total:{toDollarString(item.cost + item.tax)}</div> 
                  </div>
              </div>


          </div>
      )
  }



export default BasketPlank;
