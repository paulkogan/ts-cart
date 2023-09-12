import React, {useState, useRef, useContext, useEffect} from 'react';
import type {Product, CartStateContextType} from "../../types/types"
import './Admin.css';
import ProductForm from './ProductForm';
import AdminProductList from './AdminProductList';
import {CartStateContext}  from '../../hooks/CartStateContext' 
import {axiosGetRequest, axiosPostRequest} from '../../services/api_service'


const ProductAdmin:React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const {cartState, updateCartDispatch, auth}   = useContext(CartStateContext) as CartStateContextType;
  const runRef = useRef(false);

  useEffect(() => {
      const setInitialMessage = async () => { 
          await updateCartDispatch({
              type: "UPDATE_MESSAGE", 
              payload: {
                user_message: `Please add new Products!`
              }
            })
     }

      return () => {
          if (!runRef.current) {
              setInitialMessage()     
          }
            
            runRef.current = true;                      
        }
  
    }, []) 


  useEffect(() => {
    const products_url = "/products"

    const fetchBEProducts = async () => {
      setIsLoading(true)
      try {
           const response = await axiosGetRequest(products_url)
           const data = response.data.data
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
              fetchBEProducts()               
        }
    }

  }, []) // pass in a dependency array

  const submitAddProduct = async (product: Product) => {

  
    console.log("Adding New Product: "+JSON.stringify(product))
    const add_product_url = "/products/create"
      
    const newProductPayload = JSON.stringify({
      name: product.name,
      description: product.description,
      price: Math.floor(product.price*100),
      inventory: product.inventory,
      image_url: product.image_url,

    })
    


    try {

        const response = await axiosPostRequest(add_product_url, newProductPayload)
        //console.log("response status ", response.status)
        const data = await response.data
        //console.log("NEW PRODUCT RESPONSE data is  ", data )
        if (response.status > 300) {
            await updateCartDispatch({
              type: "UPDATE_MESSAGE", 
              payload: {
                user_message: `Problem Adding Product! ${data.message}.`
              }
            })

        } else {

            await updateCartDispatch({
              type: "UPDATE_MESSAGE", 
              payload: {
                user_message: `Success! Added: ${data.data.name}.`
              }
            })

            setProductList(
              [...productList, data.data]
            )
        }
      } catch(error) {

            await updateCartDispatch({
              type: "UPDATE_MESSAGE", 
              payload: {
                user_message: `ERROR  Adding Product! ${error}.`
              }
            })
            console.log("Error: failed to add product with: ", error)
      }

  }      


  return (
    <div>
      
      <div className="cart-inner">
        <h2>Product Admin</h2>
        <div className="admin-prod-list">
              {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
              <div>
                    <AdminProductList productList = {productList}/>
              </div> 
          
              }     
       </div>

          <div className="cart-right">
            <div className="admin-app-1">
              <ProductForm submitAddProduct = {submitAddProduct} />
            </div>
          </div>


      </div>
    </div>
  );
}

export default ProductAdmin;

