import React from 'react';
import {BasketItem} from "../types/types"
import BasketPlank from "./BasketPlank"
import './Cart.css';

interface Props {
  selected: BasketItem[]
}

const  BasketList:React.FC <Props> = ({selected}) => {

  const renderBasketlist = ():JSX.Element[]  => {

    return selected.map(item =>  {
    
      return (
        <div key={item.basketItemId} className="basket-outer-item" >
              <BasketPlank item = {item} />
        </div>
      )
    })

  }

  return (
    <div className="basket-list">
      {selected && renderBasketlist()}
    </div>
  );
}

export default BasketList;
