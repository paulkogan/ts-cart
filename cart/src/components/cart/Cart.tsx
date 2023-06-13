import React, {useState, useEffect, useContext} from 'react';
import {Product} from "../../types/types"
import './Cart.css';
import BasketList from './BasketList';
import ShoppingProductList from './ShoppingProductList';
import CheckoutForm from './CheckoutForm';
import {axiosGetRequest} from '../../services/api_service'
import {hasValidSession} from '../../services/auth_service'
import {CartStateContext}  from '../../hooks/CartStateContext'
import {getTaxRates} from "../../utils"

const Cart:React.FC = () => {

  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [taxStatesLoaded, setTaxStatesLoaded] = useState(false)
  const [userMessage, setUserMessage] = useState("Happy shopping!")



  //const [cartState, updateCartDispatch] = useReducer(CartUpdater, InitialCartState);
  //const [cartState, updateCartDispatch] = useCartStateContext(CartStateContext);
  const {cartState, updateCartDispatch}   = useContext(CartStateContext);

  useEffect(() => {

    const products_url = "products"
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
        console.log("Cart SETUP runs once!")
        if (productList.length === 0) {            
              fetchBEProducts()              
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
  // <div> Session Token {sessionStorage.getItem('sessionToken')}</div>
  //   <div> CART STATE ========= {JSON.stringify(cartState.user_uuid)}</div>
  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>
        <div>User message: {userMessage}</div>
        <div> CartState - user: {cartState.user_uuid}</div>
        <div>Session: {hasValidSession() ? "VALID" : "NOT VALID"}</div>

        {/* <div className="user-info">User: {sessionStorage.name}</div> 
        <div>Home_state: {sessionStorage.home_state}</div>
         */}
        {sessionStorage.decodedToken && 
            <>
              <div>Decoded Token {sessionStorage.decodedToken}</div> 
              <div>Exp Time {sessionStorage.expDisplayTime}</div>
              <div>Session exp.: {Math.floor((JSON.parse(sessionStorage.decodedToken).exp*1000-Date.now())/1000)}</div>


            </>
        }
   
    
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


{/* <div> Now at Create Milis {sessionStorage.nowAtCreate}</div>   
<div> Now .......{Date.now()}</div>
<div> Exp Milis {Number(sessionStorage.exp)*1000}</div>
<div> Diff {Number(sessionStorage.exp*1000)-Date.now()}</div>
<div> Minutes {moment.duration(    Number(sessionStorage.exp*1000) - Date.now() ).minutes()}</div> */}