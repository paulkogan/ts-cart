import React from 'react';
import {Product} from "../types/types"
import AdminProductPlank from "./AdminProductPlank"
import './Admin.css';

interface Props {
  productList: Product[]
}

const  ProductList:React.FC <Props> = ({productList}) => {


  const handleAdd = (product: Product) => {
      console.log("adding "+product.product_id)
  }

  const renderProductlist = ():JSX.Element[]  => {

    return productList.map(item => {
      return (
        <div key={item.product_id} className="prod-list-item" >
        <AdminProductPlank  item = {item} />
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
