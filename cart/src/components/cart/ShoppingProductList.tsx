import React from 'react';
import {Product} from "../../types/types"
import ShoppingProductPlank from "./ShoppingProductPlank"
import './Shopping.css';

interface Props {
  productList: Product[]
  addToBasket: (product: Product) => any 
}

const  ShoppingProductList:React.FC <Props> = ({productList, addToBasket}) => {


  const handleAdd = (product: Product) => {
      addToBasket(product)
  }

  const renderProductlist = ():JSX.Element[]  => {

    return productList.map((item, idx) => {
      //console.log(JSON.stringify(item))
      return (
          <div key={item.product_id} className="prod-list-item" >

            <ShoppingProductPlank  handleAdd = {handleAdd} item = {item} /><br/>

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


//<ShoppingProductPlank  handleAdd = {handleAdd} item = {item} />
//<div>{JSON.stringify(item.product_id)}</div>