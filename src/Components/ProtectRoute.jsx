import React from 'react'
import { Navigate } from "react-router";


const ProtectRoute = () => {
  const userLocal = localStorage.getItem('userId')
  if (!userLocal) {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectRoute