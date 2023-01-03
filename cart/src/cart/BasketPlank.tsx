import React from 'react';
import {BasketItem} from "../types/types"
import './Cart.css';

interface Props {
  item: BasketItem
}

const  BasketPlank:React.FC <Props> = ({item}) => {
      const priceFloat = parseFloat((Number(item.price)).toFixed(2))
      console.log("tax:" + typeof item.tax)
      console.log("price: " + typeof item.price)
      console.log("priceFloat: " + typeof priceFloat)
      const plank_total = parseFloat((item.tax+priceFloat).toFixed(2))
      console.log("total: "+typeof plank_total)
      return (
          <div className="basket-plank" >
              <div className="basket-plank-img">
                    <img className="basket-img" src={item.image_url}></img>
              </div>
              <div className="basket-plank-info">
                  <div> {item.name} </div> 
                  <div> {item.basketItemId}</div>
                  <div> {item.product_id} </div> 

              </div>
              <div className="basket-plank-cost">
                  <div> Price: {item.price}</div>
                  <div> Tax:{item.tax}</div> 
                  <div> Total:{plank_total}</div> 
              </div>


          </div>
      )
  }



export default BasketPlank;
