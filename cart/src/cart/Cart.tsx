import React, {useState, useEffect, useReducer} from 'react';
import {Product, BasketItem, CartState} from "../types/types"
import './Cart.css';
import BasketList from './BasketList';
import ShoppingProductList from './ShoppingProductList';
import CheckoutForm from './CheckoutForm';
import LoginPage from './LoginPage';
import CartUpdater from './CartUpdater';



const initialUserDetails = {
  user_uuid: null,
  email: "",
  name: "",
  avatar: ""

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
    "cart_id": undefined,
    "user_id": undefined,
    "next_item_id": 100,
    "basket_items" : [],
    "delivery_us_state": "",
    "tax_by_state":  {
      "NY" : 0,
      "FL" : 0,
      "AZ" : 0
    },
    "us_tax_rates": {}
  }
  

  const [cartState, updateCartDispatch] = useReducer(CartUpdater, InitialCartState);



  useEffect(() => {
    // console.log("render: " + cartState.num_items)
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
          "NY": 20.50,
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


  const addToBasket = (product: Product) => {
    //console.log("addToBasket: New Item in Cart: "+JSON.stringify(product))

        updateCartDispatch({
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
    const find_user_url = "http://localhost:3001/users/find_user"
    setLoginState("in_progress")

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: login})
    };

    try {
        const response= await fetch(find_user_url, requestOptions)
        const data = await response.json()
        // console.log("response status ", response.status)
        // console.log("DATA is  ", data)
        if (response.status > 300) {
            setLoginState("error")
            setUserMessage(data.message)
            return "error"

        } else {
            setLoginState("success")
            setUserMessage(`Success! User: ${data.email} is logged in`)
            await setUserDetails({...userDetails,
                email: data.email,
                name: data.name
            })
            return "success"
        }
        

   } catch(error) {
        console.log("Error!: failed to submit login info.", error)
   }


  };



  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>
        <div className="cart-left">


          <div>ls: {loginState}</div>
          <div>um: {userMessage}</div>
          { loginState != "success" ? 
              <div className="cart-app-4">
                <LoginPage handleLogin = {handleLogin}/>
              </div>
                :
              <div> 
                {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
                      <ShoppingProductList productList = {productList} addToBasket={addToBasket}/>        
                }
              </div>
          }

          
     

        </div>

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


      </div>
    </div>
  );
}

export default Cart;

