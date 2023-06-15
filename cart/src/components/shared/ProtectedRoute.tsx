import React from 'react';
import { Navigate } from "react-router-dom";
import {hasValidSession} from '../../services/auth_service'




export const ProtectedRoute = ( {children, path}:any) => {

  if (!hasValidSession()) { 
    // TODO: how to get route of this component
    sessionStorage.setItem("lastPage", path) 
    return <Navigate to="/login" />;
  }  
  return children;
};

