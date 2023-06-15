import React, {useState, useEffect, useContext} from 'react';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
} from "react-router-dom";
import Login from './shared/LoginPage';
import { ProtectedRoute } from "./shared/ProtectedRoute";
import Nav from './shared/Nav';
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
                <Route path="/cart"  element={<Cart/>} />
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
                      <ProtectedRoute path="/orders">
                          <Orders/>
                      </ProtectedRoute>
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