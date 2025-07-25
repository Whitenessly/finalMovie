import './App.css'
import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import Home from './Routes/Home';
import Search from './Routes/Search'
import Movies from './Routes/Movies';
import MovieDetail from './Routes/MovieDetail';
import Booking from './Routes/Booking'
import Tickets from './Routes/Tickets'
import TicketDetails from './Routes/TicketDetails';
import User from './Routes/User'
import ProtectRoute from './Components/ProtectRoute';
import NotFound from './Routes/NotFound';
import Staff from './Routes/Staff';
import StaffTicket from './Routes/StaffTicket';

function App() {

  return (
    <div>
      <Routes>
        <Route path='' element={<Navigate to={'/home'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/booking/:id' element={
          <ProtectRoute>
            <Booking />
          </ProtectRoute>
        } />
        <Route path='/tickets' element={<Tickets />} />
        <Route path='/tickets/:id' element={
          <ProtectRoute>
            <TicketDetails />
          </ProtectRoute>
        } />
        <Route path='/user' element={<User />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/staff/ticket' element={<StaffTicket />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
