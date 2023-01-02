import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import Cart from './cart/Cart';
import Admin from './admin/Admin';
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
                <Link to="/admin">Admin</Link>
              </div>
            </div>

            <Routes>
            <Route path="/"  element={<Admin/>} />
              <Route path="/cart"  element={<Cart/>} />
              <Route path="/admin"  element={<Admin/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default Nav;
