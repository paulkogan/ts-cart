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
 



const Home:React.FC = () => {


  return (
    <Router>
      <div className="home-outer" >
            <div className="home-links"> 
              <div className="nav-link"> 
                <Link to="/cart">Cart</Link>
              </div>
              <div className="nav-link"> 
                <Link to="/admin">Admin</Link>
              </div>
            </div>

            <Routes>
              <Route path="/cart"  element={<Cart/>} />
              <Route path="/admin"  element={<Admin/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default Home;
