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
                    <img className="basket-img" src={item.imageURL}></img>
              </div>
              <div className="basket-plank-info">
                  <div> {item.name} </div> 
                  <div> {item.basketItemId}</div>
                  <div> {item.productId} </div> 

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
