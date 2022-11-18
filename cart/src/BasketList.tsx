import React from 'react';
import {Product, BasketItem} from "./types/types"
import './Cart.css';

interface Props {
  selected: BasketItem[]
}

const  BasketList:React.FC <Props> = ({selected}) => {

  const renderBasketlist = ():JSX.Element[]  => {

    return selected.map(item => {
      return (
          <div key={item.cart_id} className="prod-list-item" >
            <span><img className="prod-list-img" src={item.imageUrl}></img></span> 
            <span> {item.name} </span> <span> {item.price}</span>
            <div> {item.cart_id}</div>
          </div>
      )
    })

  }

  return (
    <div className="prod-list">
      {selected && renderBasketlist()}
    </div>
  );
}

export default BasketList;
