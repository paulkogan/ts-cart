import React, {useState, useEffect, useReducer} from 'react';
import {Product, OrderItem, CartState} from "../types/types"
import './Cart.css';
import BasketList from './BasketList';
import ShoppingProductList from './ShoppingProductList';
import CheckoutForm from './CheckoutForm';
import LoginPage from './LoginPage';
import CartUpdater from './CartUpdater';
import jwt from 'jwt-decode';


const initialUserDetails = {
  user_uuid: null,
  email: "",
  name: "",
  avatar: "",
  home_state: "", 
}

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
  const [loginState, setLoginState] = useState("none")
  const [userMessage, setUserMessage] = useState("Please Log In")
  const [userDetails, setUserDetails] = useState(initialUserDetails)

  const InitialCartState = {
    "user_uuid": undefined,
    "basket_items" : [],
    "delivery_us_state": "",
    "us_tax_rates": {},
    price_total:0.0,
    tax_total:0.0
  }
  

  const [cartState, updateCartDispatch] = useReducer(CartUpdater, InitialCartState);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // console.log("render: " + cartState.num_units)
    //load product list
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
              //console.log("Fetching BE products!")
              fetchBEProducts(products_url)
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

/*
loginState:
    none
    in_progress
    success
    error

*/




  const handleLogin = async (login: string, password: string)  =>  {
    // start with just finding user
    const login_url = "http://localhost:3001/users/login"
    setLoginState("in_progress")

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: login, password})
    };

    try {
        const response= await fetch(login_url , requestOptions)
        const body = await response.json()
        //console.log("response status ", response.status)
        console.log("LOGIN result body is  ", body)
        if (response.status > 300) {
            setLoginState("error")
            setUserMessage(body.message)
            return "error"

        } else {
            let data = body.data
            let user = data.user
            let token = data.token
            setLoginState("success")
            setUserMessage(`Success! User: ${user.name} is logged in`)
            const dt = await jwt(token)
            setDecodedToken(jwt(token))
            await sessionStorage.setItem('sessionToken', token);
            await sessionStorage.setItem('decodedToken', JSON.stringify(dt));
            await sessionStorage.setItem('user', JSON.stringify(user));
            await setUserDetails({...userDetails,
                email: user.email,
                name: user.name,
                home_state: user.home_state, 
                user_uuid: user.user_uuid
            })

            updateCartDispatch({
              type: "SET_customer_details", 
              payload: {
                delivery_us_state: user.home_state,
                user_uuid: user.user_uuid
               }
            }) 
            return "success"
        }
        

   } catch(error) {
        console.log("Error!: failed to submit login info.", error)
   }


  };


  // var iat = new Date(1572468316 * 1000);
  // var exp = new Date(1572468916 * 1000);
  //               <div>IAT {new Date(decodedToken * 1000).toISOString()}</div> 
  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>

        <div>User message: {userMessage}</div>
        <div className="user-info">User: {userDetails.name}</div> 
        <div>Home_state: {userDetails.home_state}</div>
        
        {decodedToken && 
            <>
              <div>Decoded Token {JSON.stringify(decodedToken)}</div> 

            </>
        }
        <div> Session Token {sessionStorage.getItem('sessionToken')}</div>
    
        <div className="cart-left">
          { loginState != "success" ? 
              <div className="cart-login">
                <LoginPage handleLogin = {handleLogin} />
              </div>
                :
                <div className="cart-prod-list">
                {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
                      <ShoppingProductList productList = {productList} addToBasket={addToBasket}/>        
                }
              </div>
          }

          
     

        </div>

        

        { (loginState == "success") && 
          <div className="cart-right">
              <div className="cart-app-3">
                {!taxStatesLoaded ? <div> PLEASE WAIT - TAX STATES LOADING !!!</div> : 
                <div>
                  <CheckoutForm cartState = {cartState} updateCartDispatch={updateCartDispatch}  />
                </div> 
                }
              </div>

              <div className="cart-app-3">
                  <BasketList selected = {cartState.basket_items}/>
              </div>
          </div>
          }

      </div>
    </div>
  );
}

export default Cart;

//<div>Decoded Token Storage {JSON.stringify(sessionStorage.getItem('decodedToken'))}</div> 
