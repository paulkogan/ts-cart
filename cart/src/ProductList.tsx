import React from 'react';
import {Product} from "./types/types"
import './Cart.css';

interface Props {
  productList: Product[]
}

const  ProductList:React.FC <Props> = ({productList}) => {

  const renderProductlist = ():JSX.Element[]  => {

    return productList.map(item => {
      return (
          <div key={item.product_id} className="prod-list-item" >
            <span><img className="prod-list-img" src={item.imageUrl}></img></span> 
            <span> {item.name} </span> <span> {item.price}</span>
            <div> {item.product_id}</div>
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

export default ProductList;
