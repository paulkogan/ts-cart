import React from 'react';
import type {OrderItem} from "../../types/types"
import BasketPlank from "./BasketPlank"
import './Cart.css';

interface BasketListProps extends React.HTMLAttributes<HTMLDivElement>{
  selected: OrderItem[]
}

const  BasketList:React.FC <BasketListProps> = ({selected}) => {

  const renderBasketlist = ():JSX.Element[]  => {

    return selected.map(item =>  {
    
      return (
        <div key={item.product_id} className="basket-outer-item" >
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
