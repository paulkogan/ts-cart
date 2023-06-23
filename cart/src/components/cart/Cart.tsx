import React, {useState, useEffect, useContext} from 'react';
import {Product} from "../../types/types"
import BasketList from './BasketList';
import ShoppingProductList from './ShoppingProductList';
import CheckoutForm from './CheckoutForm';
import {axiosGetRequest} from '../../services/api_service'
import {hasValidSession} from '../../services/auth_service'
import {CartStateContext}  from '../../hooks/CartStateContext'
import {getTaxRates} from "../../utils"
import './Cart.css';


const Cart:React.FC = () => {

  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const {cartState, updateCartDispatch}   = useContext(CartStateContext);



  useEffect(() => {

    const addUserToCartState = async () => {
      //check session storage for user info    
      const user = sessionStorage.getItem('sessionData')
      if (user) {
           const userObj = JSON.parse(user)
           await updateCartDispatch({
              type: "SET_CUSTOMER_DETAILS", 
              payload: userObj
            })
            console.log("adding user info to cartState - EFFECT")

      } else {
          console.log("No user info in sessionStorage to add to cartState.")
      }
    }
      return () => {
          if (!cartState.user_uuid) {
              console.log("cartState missing a User, so trying to add!")            
              addUserToCartState ()              
          }
      } 
  }, []) 


  //get product list
  useEffect(() => {
    const products_url = "/products"
    const sourceTaxRates = getTaxRates()
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

    //need to fetch inside useEffect (or useCallback)
    return () => {
        console.log("Cart SETUP runs once - getting PRODUCT list")
        if (productList.length === 0) {            
              fetchBEProducts()              
        }
    }

  }, []) 

  const addToBasket = async (product: Product) => {
    //console.log("addToBasket: New Item in Cart: "+JSON.stringify(product))

        await updateCartDispatch({
          type: "ADD_ITEM", 
          payload: {
            product: product,
          }
        })
        await updateCartDispatch({
          type: "UPDATE_MESSAGE", 
          payload: {
            user_message: `Added ${product.name} to your basket.`,
          }
        })


  } 

  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>
        <div>Cart State: {cartState.delivery_us_state || 'none'}</div>
        <div>Session: {hasValidSession() ? JSON.parse(sessionStorage.sessionData).name : "NO SESSION - Please log in"}</div>

   
    
        <div className="cart-left">
                <div className="cart-prod-list">
                {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
                      <ShoppingProductList productList = {productList} addToBasket={addToBasket} />        
                }
              </div>
        </div>



        <div className="cart-right">
            <div className="cart-app-3">
                <CheckoutForm cartState = {cartState} updateCartDispatch={updateCartDispatch} />
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
