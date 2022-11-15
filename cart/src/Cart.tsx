import React, {useState, useEffect, useReducer} from 'react';
import {MOCK_PRODUCTS} from './tests/mocks';
import {Product, TaxRates} from "./types/types"
import './Cart.css';
import CartList from './CartList';
import ProductForm from './ProductForm';
import PracticePage from './PracticePage';
import FetchPage from './FetchPage';
import LoginPage from './LoginPage';
import TaxReducer from './TaxReducer';
import LikeButton from './LikeButton';

const InitialCartState = {
  "items_total" : 0,
  "num_items": 0,
  "next_cart_id": 100, 
  "tax_by_state":  {
    "NY" : 0,
    "FL" : 0,
    "AZ" : 0
  }
}

const Cart:React.FC = () => {

  const [selected, setSelected] = useState<Product[]>([])
  const [CartState, TaxDispatch] = useReducer(TaxReducer, InitialCartState);


  useEffect(() => {
    // console.log("render: " + CartState.num_items)

    const loadInitial = async (arr: any[], initial_id: number) => {
        const new_arr = arr.map( product => {
            TaxDispatch({
              type: "ADD_TO_CART", 
              payload: {
                item_amount: product.price,
                us_state: product.us_state,
              }
            })
            
            product.cart_id = initial_id
            initial_id +=1 
            console.log("New Initial Item at Cart: "+JSON.stringify(product))
            return product
        })
        setSelected(new_arr)
        
    }



    return () => {
        console.log("Cart CLEANUP runs once!")
        if (selected.length === 0) {
          loadInitial(MOCK_PRODUCTS, CartState.next_cart_id)
        }
    }

  }, []) // pass in a dependency array

  const submitAddProduct = (product: Product) => {

    // update reducer here at the Cart level
    TaxDispatch({
      type: "ADD_TO_CART", 
      payload: {
        item_amount: product.price,
        us_state: product.us_state,
      }
    })

    product.cart_id = CartState.next_cart_id //this works!
    console.log("New Item at Cart: "+JSON.stringify(product))
    setSelected([
      ...selected, product
    ])
  } 


  return (
    <div>
      
      <div className="cart-inner">
        <h2>Shopping Cart</h2>
        <div className="cart-left">
          <div className="cart-app-4">
            <LoginPage />
          </div>
          <div className="cart-app-5">
            <LikeButton />
          </div>
          <CartList selected = {selected}/>
          <div> {JSON.stringify(CartState)} </div>
        </div>

        <div className="cart-right">
          <div className="cart-app-1">
              <ProductForm submitAddProduct = {submitAddProduct} />
          </div>
          <div className="cart-app-2">
              <PracticePage label = {"test"} > children</PracticePage>
          </div>
          <div className="cart-app-3">
             <FetchPage  />
          </div>

        </div>


      </div>
    </div>
  );
}

export default Cart;

//<ProductForm submitAddProduct = {submitAddProduct} />


      // arr.forEach( async product =>  {
      //     console.log("Adding INITIAL Prod in ASYNC EFFECT: "+product.name)
      //     await TaxDispatch({
      //       type: "ADD_TO_CART", 
      //       payload: {
      //         item_amount: product.price,
      //         us_state: product.us_state,
      //       }
      //     })
      
      //     product.cart_id = CartState.next_cart_id //this works!
      //     console.log("New Item at INITIAL Cart: "+JSON.stringify(product))
      //     setSelected([
      //       ...selected, product
      //     ])
      // })