import React, {useState, useEffect, useReducer} from 'react';
import {Product, OrderItem, CartState} from "../../types/types"
import './Cart.css';
import BasketList from './BasketList';
import ShoppingProductList from './ShoppingProductList';
import CheckoutForm from './CheckoutForm';
import CartUpdater from './CartUpdater';
//import jwt from 'jwt-decode';
import {axiosGetRequest} from '../../services/api_service'


// const initialUserDetails = {
//   user_uuid: null,
//   email: "",
//   name: "",
//   avatar: "",
//   home_state: "", 
// }

/*
loginState:
    none
    in_progress
    success
    error

*/





const Cart:React.FC = () => {

  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [taxStatesLoaded, setTaxStatesLoaded] = useState(false)
  const [userMessage, setUserMessage] = useState("Please Log In")

  const InitialCartState = {
    "user_uuid": "",
    "basket_items" : [],
    "delivery_us_state": "",
    "us_tax_rates": {},
    price_total:0.0,
    tax_total:0.0
  }
  

  const [cartState, updateCartDispatch] = useReducer(CartUpdater, InitialCartState);

  useEffect(() => {

    const products_url = "products"

    const fetchBEProducts = async () => {
      setIsLoading(true)
      try {

           const response = await axiosGetRequest(products_url)
           const data = response.data.data
           //console.log("PRODUCTS RESPONSE: ", response)
           setProductList(data)
           setIsLoading(false)
      } catch(error) {
           console.log("Error!: failed to fetch product data", error)
      }
   }


    const fetchTaxRates = () => {
      try {
        // later will fetch from BE
        const sourceTaxRates = 
          { 
          "NY": 8.125,
          "AZ": 10.25,
          "FL": 5.0,
          }
        

        updateCartDispatch({
              type: "UPDATE_STATE_TAX_RATES", 
              payload: {
                us_tax_rates:  sourceTaxRates,
              }
        })
        setTaxStatesLoaded(true)
      } catch(error) {
        console.log("Error!: failed to fetch tax rates", error)
      }

    }

    //need to fetch inside useEffect (or useCallback)
    return () => {
        console.log("Cart SETUP runs once!")
        if (productList.length === 0) {            
              fetchBEProducts()
              fetchTaxRates()                  
        }
    }

  }, []) // pass in a dependency array


  const addToBasket = async (product: Product) => {
    //console.log("addToBasket: New Item in Cart: "+JSON.stringify(product))

        await updateCartDispatch({
          type: "ADD_ITEM", 
          payload: {
            product: product,
          }
        })

  } 




  // var iat = new Date(1572468316 * 1000);
  // var exp = new Date(1572468916 * 1000);
  // <div>IAT {new Date(decodedToken * 1000).toISOString()}</div> 
  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>
        <div>User message: {userMessage}</div>
        {/* <div> CART STATE ========= {JSON.stringify(cartState)}</div>
        <div className="user-info">User: {sessionStorage.name}</div> 
        <div>Home_state: {sessionStorage.home_state}</div>
         */}
        {sessionStorage.decodedToken && 
            <>
              <div>Decoded Token {sessionStorage.decodedToken}</div> 

            </>
        }
        <div> Session Token {sessionStorage.getItem('sessionToken')}</div>
    
        <div className="cart-left">
                <div className="cart-prod-list">
                {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
                      <ShoppingProductList productList = {productList} addToBasket={addToBasket}/>        
                }
              </div>
        </div>



        <div className="cart-right">
            <div className="cart-app-3">
                <CheckoutForm cartState = {cartState} updateCartDispatch={updateCartDispatch}  />
            </div>

            <div className="cart-app-3">
                <BasketList selected = {cartState.basket_items}/>
            </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;


