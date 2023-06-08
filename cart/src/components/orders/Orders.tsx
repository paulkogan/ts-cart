import React, {useState, useEffect, useRef} from 'react';
import './Orders.css';
import {Order, OrderItem} from "../../types/types"
import OrdersTable from './OrdersTable';
import Pagination from './Pagination';
import {axiosGetRequest} from '../../services/api_service'

const Orders:React.FC = () => {

  const [ordersList, setOrdersList] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loginState, setLoginState] = useState("none")
  const [pageIndex, setPageIndex] = useState(1)
  const dataFetchedRef = useRef(false);


  const updatePageIndex = (newPage:number) => {
      dataFetchedRef.current = false; //reset fresh data flag if index changes
      setPageIndex(newPage)
  }

  useEffect(() => {
    const fetchBEOrders = async () => {
      
      if (dataFetchedRef.current) {
        setIsLoading(false)
        return; //flag to stop multiple loads with strict mode
      }

      const orders_url = `orders`
      const orders_params = {'page':pageIndex}
      try {

           const response = await axiosGetRequest(orders_url, orders_params)

           const data = response.data.data           
           dataFetchedRef.current = true; //controlled load
           //console.log("AXIOS Orders RESPONSE.data: ", data)
           setOrdersList(data)
           setIsLoading(false)
      } catch(error) {
           console.log("FE API Error!: failed to fetch orders data", error)
           // redirect to login
           
      }
    }
    setIsLoading(true)
    fetchBEOrders()


    }, [pageIndex]) 



 

  return (
    <div>
      
      <div className="orders-outer">
        <h2>Orders List</h2>

  
          <div className="orders-inner">
            {isLoading ? <div> PLEASE WAIT - ORDERS LOADING !!!</div> : 
                <div>
                  <OrdersTable ordersList = {ordersList} /> 
                  <Pagination setPageIndex = {updatePageIndex} pageIndex = {pageIndex} /> 
                </div>  
                        
            }
          </div>

           
      </div>
    </div>
  );
}

export default Orders;
