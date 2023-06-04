import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import Cart from './cart/Cart';
import UserAdmin from './admin/UserAdmin';
import ProductAdmin from './admin/ProductAdmin';
import Orders from './orders/Orders';
import Practice from './practice/Practice';
import './App.css';
 



const Nav:React.FC = () => {

  return (
    <Router>
      <div className="nav-outer" >
            <div className="home-links"> 
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

            <Routes>
              <Route path="/"  element={<ProductAdmin/>} />
              <Route path="/cart"  element={<Cart/>} />
              <Route path="/productadmin"  element={<ProductAdmin/>} />
              <Route path="/orders"  element={<Orders/>} />
              <Route path="/useradmin"  element={<UserAdmin/>} />
              <Route path="/practice"  element={<Practice/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default Nav;
