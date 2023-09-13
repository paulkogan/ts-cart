import React, { useContext} from 'react';
import {
  Link, 
} from "react-router-dom";
import {CartStateContext}  from '../../hooks/CartStateContext' 
import { useNavigate} from "react-router-dom"; 
import '../App.css';
import type {CartStateContextType} from "../../types/types"


const Nav:React.FC = () => {
  const {cartState, auth}   = useContext(CartStateContext) as CartStateContextType;
  const navigate = useNavigate(); 

  const logoutWithNav = async () => {
    const logoutResult = await auth.handleLogoutHook()
    if (logoutResult.status === 'fail') {
      navigate('/login')
    } 
  }


  return (
      <div className="nav-outer" >
            <div className="home-links">

                <div className="nav-link"> 
                  <Link to="/login" onClick={() => logoutWithNav()} >Logout</Link>
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
                  <Link to="/profile">Profile</Link>
                </div>
                <div className="nav-link"> 
                  <Link to="/practice">Practice</Link>
                </div>
            </div>
            <div className="nav-message">
              {cartState.user_message}
            </div>

      </div>
  );
}

export default Nav;
