import React from 'react';
import {Product} from "../types/types"
import {toDollarString} from "../utils"
import './Cart.css';


interface Props {
  item: Product
  handleAdd: (product: Product) => any 
}

const  ShoppingProductPlank:React.FC <Props> = ({item, handleAdd}) => {

      return (
          <div className="prod-list-plank" >
              <div className="basket-plank-img">
                    <img className="prod-list-img" src={item.image_url}></img>
              </div>
              <div className="basket-plank-info">
                  <div> {item.name} </div> 
                  <div> ${toDollarString(item.price)} </div>
                  <div> inv: {item.inventory} </div>
                  <div className="prod-list-add">
                    <button onClick={() => handleAdd(item)}>Add to Cart</button>
                  </div> 

              </div>



          </div>
      )
  }



export default ShoppingProductPlank;


