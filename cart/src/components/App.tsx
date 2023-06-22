import React, {useState, useEffect, useContext} from 'react';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import { ProtectedRoute } from "./shared/ProtectedRoute";
import Login from './shared/LoginPage';
import Nav from './shared/Nav';
import ProfilePage from './shared/ProfilePage';
import Cart from './cart/Cart';
import UserAdmin from './admin/UserAdmin';
import ProductAdmin from './admin/ProductAdmin';
import Orders from './orders/Orders';
import Practice from './practice/Practice';

import {CartStateProvider}  from '../hooks/CartStateContext' 
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-outer" >
      <CartStateProvider>
        <Nav/>
      </CartStateProvider>  
      </div>

      <CartStateProvider>
            <Routes>
                <Route path="/"  element={<Login/>} />
                <Route path="/login"  element={<Login/>} />
                {/* no route for logout */}
                <Route path="/cart"  element={<Cart/>} />
                <Route path="/profile"  element={<ProfilePage/>} />
                <Route path="/productadmin"  element={<ProductAdmin/>} />

                <Route path="/useradmin"
                    element={
                      <ProtectedRoute path="/useradmin">
                          <UserAdmin/>
                      </ProtectedRoute>
                    }
                />

                <Route path="/orders"
                    element={               
                          <Orders/>
                    }
                />

                <Route path="/practice"
                    element={
                      <ProtectedRoute path="/practice">
                          <Practice/>
                      </ProtectedRoute>
                    }
                /> 
            </Routes>
      </CartStateProvider>
    </Router>
  );
}

export default App;