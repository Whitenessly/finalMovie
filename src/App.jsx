import './App.css'
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import Home from './Routes/Home';

function App() {
  const [isLogined, setIsLogined] = React.useState({
    status: false,
    id: null,
    username: null,
    password: null
  });

  return (
    <div>
      <Routes>
        <Route path='' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
