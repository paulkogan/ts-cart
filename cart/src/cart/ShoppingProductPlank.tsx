import React from 'react';
import {Product} from "../types/types"
import './Cart.css';

interface Props {
  item: Product
  handleAdd: (product: Product) => any 
}

const  ShoppingProductPlank:React.FC <Props> = ({item, handleAdd}) => {

      return (
          <div className="basket-plank" >
              <div className="basket-plank-img">
                    <img className="prod-list-img" src={item.imageUrl}></img>
              </div>
              <div className="basket-plank-info">
                  <div> {item.name} </div> 
                  <div> {item.product_id} </div> 

              </div>
              <div className="basket-plank-cost">
                    <button onClick={() => handleAdd(item)}>Add to Cart</button>
              </div>


          </div>
      )
  }



export default ShoppingProductPlank;


