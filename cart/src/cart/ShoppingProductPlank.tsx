import React from 'react';
import {Product} from "../types/types"
import {toDollarString} from "../utils"
import './Shopping.css';


interface Props {
  item: Product
  handleAdd: (product: Product) => any 
}

const  ShoppingProductPlank:React.FC <Props> = ({item, handleAdd}) => {

      return (
          <div className="shopping-plank" >
              <div className="shopping-plank-img">
                    <img className="shopping-img" src={item.image_url}></img>
              </div>
              <div className="shopping-plank-info">
                  <div className="shopping-add-button">
                        <button onClick={() => handleAdd(item)}>Add to Cart</button>
                  </div> 
                  <div> {item.name} </div> 
                  <div> ${toDollarString(item.price)} </div>
                  <div> inv: {item.inventory} </div>
              </div>




          </div>
      )
  }



export default ShoppingProductPlank;

