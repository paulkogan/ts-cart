import React, {useState, useEffect, useReducer} from 'react';
import {Product, BasketItem} from "../types/types"
import './Admin.css';
import ProductForm from './ProductForm';
import ProductList from './ProductList';



const ProductAdmin:React.FC = () => {

  const [userMessage, setUserMessage] = useState("Please enter product info.")
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
           //console.log("PRODUCTS BODY: ", data)
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

  // onst handleSubmit = async (): Promise<string | undefined> => {
  const submitAddProduct = async (product: Product) => {

    // product.cart_id = CartState.next_cart_id //this works!
    console.log("New Item at Cart: "+JSON.stringify(product))
 


    const regitser_user_url = "http://localhost:3001/products/create"

    console.log(`Submit: New Productis: ${JSON.stringify(product)}`)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url
        })
    };
      
 
    try {
        const response= await fetch(regitser_user_url , requestOptions)
        const data = await response.json()
        console.log("response status ", response.status)
        console.log("NEW PRODUCT DATA is  ", data)
        if (response.status > 300) {
            setUserMessage(data.message)
            //setRegStatus("error")


        } else {
            setUserMessage(`Success! Added Product ${data}`)

            setProductList(
              [...productList, data]
            )

        }
        

      } catch(error) {
            setUserMessage(`Error: failed to add product with:  ${error}`)
            console.log("Error: failed to add product with: ", error)
            //setRegStatus("error")
      }

  }      


  return (
    <div>
      
      <div className="cart-inner">
        <h2>Product Admin</h2>
        <div className="admin-left">
              {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
              <div>
                    <ProductList productList = {productList}/>
              </div> 
          
              }     
       </div>

          <div className="cart-right">
            <div>MESSAGE: {userMessage}</div>
            <div className="admin-app-1">
              <ProductForm submitAddProduct = {submitAddProduct} />
            </div>
          </div>


      </div>
    </div>
  );
}

export default ProductAdmin;

