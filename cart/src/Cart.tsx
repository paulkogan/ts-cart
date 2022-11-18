import React, {useState, useEffect, useReducer} from 'react';
import {Product, BasketItem} from "./types/types"
import './Cart.css';
import BasketList from './BasketList';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import LoginPage from './LoginPage';
import CartUpdater from './CartUpdater';




const Cart:React.FC = () => {

  const [basketList, setBasketList] = useState<BasketItem[]>([])
  const [productList, setProductList] = useState<Product[]>([])
  //const [USTaxRates, setUSTaxRates] = useState<USTaxState[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const loadLocal = true


  const InitialCartState = {
    "items_total" : 0,
    "num_items": 0,
    "next_cart_id": 100, 
    "tax_by_state":  {
      "NY" : 0,
      "FL" : 0,
      "AZ" : 0
    },
    "us_tax_rates": null
  }

  const [CartState, UpdateCartDispatch] = useReducer(CartUpdater, InitialCartState);


  useEffect(() => {
    // console.log("render: " + CartState.num_items)
    //load product list
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


    const fetchTaxRates = () => {
      const sourceTaxRates = 
        { 
        "NY": 10.0,
         "AZ": 5.25,
         "FL":1.0,
        }
      
      /// later will fetch from BE
      UpdateCartDispatch({
            type: "UPDATE_STATE_TAX_RATES", 
            payload: {
              us_tax_rates:  sourceTaxRates,
            }
       })

    }

    //need to fetch inside useEffect (or useCallback)
    return () => {
        console.log("Cart SETUP runs once!")
        if (productList.length === 0) {
              console.log("Fetching BE products!")
              fetchBEProducts(products_url)
              fetchTaxRates()                  
        }
    }

  }, []) // pass in a dependency array


  const submitAddProduct = (product: Product) => {

    // update reducer here at the Cart level
    // TaxDispatch({
    //   type: "ADD_ITEM", 
    //   payload: {
    //     item_amount: product.price,
    //     us_state: product.us_state,
    //   }
    // })

    // product.cart_id = CartState.next_cart_id //this works!
    console.log("New Item at Cart: "+JSON.stringify(product))
    setProductList(
      [...productList, product]
    )
  } 


  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>
        <div className="cart-left">
          <div className="cart-app-4">
            <LoginPage />
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

          <div className="cart-app-3">
            <div> {JSON.stringify(CartState)} </div>
            <BasketList selected = {basketList}/>
          </div>

        </div>


      </div>
    </div>
  );
}

export default Cart;

