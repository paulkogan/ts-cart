import React from 'react';
import {BasketItem} from "../types/types"
import './Cart.css';

interface Props {
  item: BasketItem
}

const  BasketPlank:React.FC <Props> = ({item}) => {

      return (
          <div className="basket-plank" >
              <div className="basket-plank-img">
                    <img className="basket-img" src={item.imageUrl}></img>
              </div>
              <div className="basket-plank-info">
                  <div> {item.name} </div> 
                  <div> {item.cart_id}</div>
                  <div> {item.product_id} </div> 

              </div>
              <div className="basket-plank-cost">
                  <div> Price: {item.price}</div>
                  <div> Tax:{item.tax}</div> 
                  <div> Total:{item.tax+item.price}</div> 
              </div>


          </div>
      )
  }



export default BasketPlank;
