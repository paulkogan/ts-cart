import React, {useState, useEffect} from 'react';
import {Product, OrderItem} from "../types/types"
import './Admin.css';
import ProductForm from './ProductForm';
import AdminProductList from './AdminProductList';



const ProductAdmin:React.FC = () => {

  const [userMessage, setUserMessage] = useState("Please enter new product")
  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const products_url = "http://localhost:3001/products"


    const fetchBEProducts = async (url: string) => {

      const tokenString = `Bearer ${sessionStorage.getItem('sessionToken')}`
      const fetchOptions = {
        headers: {'Authorization': tokenString}
      }
  
      setIsLoading(true)
      try {
           const response= await fetch(url, fetchOptions)
           const body = await response.json()
           const data = body.data
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

  // const handleSubmit = async (): Promise<string | undefined> => {
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
          price: Math.floor(product.price*100),
          inventory: product.inventory,
          image_url: product.image_url,

        })
    };
      
 
    try {
        const response= await fetch(regitser_user_url , requestOptions)
        const payload = await response.json()
        console.log("response status ", response.status)
        console.log("NEW PRODUCT RESPONSE payload is  ", payload )
        if (response.status > 300) {
            setUserMessage(payload.message)
        } else {
            setUserMessage(`Success! Added: ${payload.data.name}.`)
            setProductList(
              [...productList, payload.data]
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
        <div className="admin-prod-list">
              {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
              <div>
                    <AdminProductList productList = {productList}/>
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

