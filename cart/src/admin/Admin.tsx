import React, {useState, useEffect, useReducer} from 'react';
import {Product, BasketItem} from "../types/types"
import './Admin.css';
import LoginPageOld from './LoginPageOld';
import FetchPage from './FetchPage';
import PracticePage from './FetchPage';
import ProductForm from './ProductForm';
import ProductList from './ProductList';



const Admin:React.FC = () => {

  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const products_url = "http://localhost:3001/products"

    const fetchBEProducts = async (url: string) => {
      setIsLoading(true)
      try {
           const response= await fetch(url)
           const body = await response.json()
           const data = body.data
           console.log("PRODUCTS BODY: ", data)
           setProductList(data)
           setIsLoading(false)
      } catch(error) {
           console.log("Error!: failed to fetch product data", error)
      }
   }




    //need to fetch inside useEffect (or useCallback)
    return () => {
        console.log("Cart SETUP runs once!")
        if (productList.length === 0) {
              console.log("Fetching BE products!")
              fetchBEProducts(products_url)               
        }
    }

  }, []) // pass in a dependency array


  const submitAddProduct = (product: Product) => {

    // product.cart_id = CartState.next_cart_id //this works!
    console.log("New Item at Cart: "+JSON.stringify(product))
    setProductList(
      [...productList, product]
    )
  } 


  return (
    <div>
      
      <div className="cart-inner">
        <h2>Admin</h2>
        <div className="cart-left">
          <div className="cart-app-4">
            <LoginPageOld />
          </div>

          <div> 
            {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
            <div>
                  <ProductList productList = {productList}/>
            </div> 
        
            }
          </div>


          
          
          

        </div>

        <div className="cart-right">
          <div className="cart-app-1">
            <ProductForm submitAddProduct = {submitAddProduct} />
          </div>


        </div>


      </div>
    </div>
  );
}

export default Admin;

