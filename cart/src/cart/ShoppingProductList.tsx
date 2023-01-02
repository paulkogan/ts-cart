import React from 'react';
import {Product} from "../types/types"
import ShoppingProductPlank from "./ShoppingProductPlank"
import './Cart.css';

interface Props {
  productList: Product[]
  addToBasket: (product: Product) => any 
}

const  ShoppingProductList:React.FC <Props> = ({productList, addToBasket}) => {


  const handleAdd = (product: Product) => {
      addToBasket(product)
  }

  const renderProductlist = ():JSX.Element[]  => {

    return productList.map(item => {
      return (
          <div key={item.productId} className="prod-list-item" >
            <ShoppingProductPlank  handleAdd = {handleAdd} item = {item} />
          </div>
      )
    })

  }

  return (
    <div className="prod-list">
      {productList && renderProductlist()}
    </div>
  );
}

export default ShoppingProductList;
