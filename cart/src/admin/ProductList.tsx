import React from 'react';
import {Product} from "../types/types"
import './Admin.css';

interface Props {
  productList: Product[]
}

const  ProductList:React.FC <Props> = ({productList}) => {


  const handleAdd = (product: Product) => {
      console.log("adding "+product.productId)
  }

  const renderProductlist = ():JSX.Element[]  => {

    return productList.map(item => {
      return (
          <div key={item.productId} className="prod-list-item" >
            <span><img className="prod-list-img" src={item.imageURL}></img></span> 
            <span> {item.name} </span> <span> {item.price}</span>
            <div> {item.productId}</div>
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
