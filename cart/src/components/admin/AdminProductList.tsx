import React from 'react';
import {Product} from "../../types/types"
import AdminProductPlank from "./AdminProductPlank"
import './Admin.css';

interface Props {
  productList: Product[]
}

const  AdminProductList:React.FC <Props> = ({productList}) => {

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

export default AdminProductList;
