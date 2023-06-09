import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import Login from './LoginPage';
import Cart from '../cart/Cart';
import UserAdmin from '../admin/UserAdmin';
import ProductAdmin from '../admin/ProductAdmin';
import Orders from '../orders/Orders';
import Practice from '../practice/Practice';
import '../App.css';
import {CartStateProvider} from '../../hooks/CartStateContext'



const Nav:React.FC = () => {

  return (
    <Router>
      <div className="nav-outer" >
            <div className="home-links">
              <div className="nav-link"> 
                <Link to="/login">Login</Link>
              </div> 
              <div className="nav-link"> 
                <Link to="/cart">Cart</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/productadmin">Product Admin</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/orders">Orders</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/useradmin">User Admin</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/practice">Practice</Link>
              </div>
            </div>

        <CartStateProvider>
            <Routes>
              <Route path="/"  element={<Login/>} />
              <Route path="/login"  element={<Login/>} />
              <Route path="/cart"  element={<Cart/>} />
              <Route path="/productadmin"  element={<ProductAdmin/>} />
              <Route path="/orders"  element={<Orders/>} />
              <Route path="/useradmin"  element={<UserAdmin/>} />
              <Route path="/practice"  element={<Practice/>} />
            </Routes>
          </CartStateProvider>
      </div>
    </Router>
  );
}

export default Nav;
