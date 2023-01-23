import React from 'react';
import {OrderItem} from "../types/types"
import './Cart.css';

interface Props {
  item: OrderItem
}

const  BasketPlank:React.FC <Props> = ({item}) => {
      const totPriceFloat = parseFloat((Number(item.price)*item.num_units).toFixed(2))
      const totTaxFloat = parseFloat((Number(item.tax)*item.num_units).toFixed(2))
      const plank_total = parseFloat((totTaxFloat+totPriceFloat).toFixed(2)).toFixed(2)
      return (
          <div className="basket-plank" >
              <div className="basket-plank-img">
                    <img className="basket-img" src={item.image_url}></img>
              </div>
              <div className="basket-plank-info">
                  <div className="basket-plank-item">{item.name}</div>
                  <div className="basket-plank-item">Inventory: {item.inventory}</div> 
                  <div className="basket-plank-item">{item.product_id}</div> 
              </div>
              <div className="basket-plank-cost">
                
                <div> Unit Price: {item.price}</div>
                <div> Num. Units: {item.num_units} </div>
                <div> Units Total: {totPriceFloat}</div>
                <div> Tax:{totTaxFloat}</div> 
                 <div> Total:{plank_total}</div> 
              </div>


          </div>
      )
  }



export default BasketPlank;
