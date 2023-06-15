import React, {useState, useEffect, useContext} from 'react';
import {
  BrowserRouter as Router,
  Link, 
} from "react-router-dom";
import {handleLogout} from '../../services/auth_service'
import '../App.css';
import {CartStateContext}  from '../../hooks/CartStateContext' 
import '../App.css';



const Nav:React.FC = () => {
  const {cartState, updateCartDispatch} = useContext(CartStateContext);

  return (
      <div className="nav-outer" >
            <div className="home-links">

              <div className="nav-link"> 
                <Link to="/login" onClick={() => handleLogout(updateCartDispatch)} >Logout Link</Link>
              </div>
 
   
              <div className="nav-link"> 
                <Link to="/login">Login</Link>
              </div> 

              <div className="nav-link"> 
                <Link to="/cart">Cart</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/orders">Orders</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/productadmin">Product Admin</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/useradmin">User Admin</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/practice">Practice</Link>
              </div>
            </div>
      </div>
  );
}

export default Nav;
