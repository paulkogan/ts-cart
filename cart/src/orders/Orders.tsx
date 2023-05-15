import React, {useState, useEffect, useReducer} from 'react';
import './Orders.css';
import {Order, OrderItem} from "../types/types"
import OrdersTable from './OrdersTable';


const Orders:React.FC = () => {

  const [ordersList, setOrdersList] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loginState, setLoginState] = useState("none")


  useEffect(() => {
    // console.log("render: " + cartState.num_units)
    //load product list
    const orders_url = "http://localhost:3001/orders"

    const fetchBEOrders = async (url: string) => {
      setIsLoading(true)
      try {
           const response= await fetch(url)
           const body = await response.json()
           const data = body.data
           console.log("ORDERS BODY: ", data)
           setOrdersList(data)
           setIsLoading(false)
      } catch(error) {
           console.log("Error!: failed to fetch orders data", error)
      }
   }

    //need to fetch inside useEffect (or useCallback)
    return () => {
        console.log("Cart SETUP runs once!")
        if (ordersList.length === 0) {            
              fetchBEOrders(orders_url)               
        }
    }

  }, []) // pass in a dependency array





  return (
    <div>
      
      <div className="orders-outer">
        <h2>Orders List</h2>

  
          <div className="orders-inner">
            {isLoading ? <div> PLEASE WAIT - ORDERS LOADING !!!</div> : 
                  <OrdersTable ordersList = {ordersList} />        
            }
          </div>
          

          
      
      </div>
    </div>
  );
}

export default Orders;

