import './App.css'
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Loading from './Components/Loading';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
  const apiKey = "6855203daa0c8c0805c3bd3d";
  // const [users, setUsers] = useState([]);
  React.useEffect(() => {
    fetch(`https://mindx-mockup-server.vercel.app/api/resources/oke?apiKey=${apiKey}`)
      // {
      //   method: "GET",
      //   headers: {
      //     "apiKey": "6855203daa0c8c0805c3bd3d"
      //   }
      // })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data.data.data.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);
  // console.log(users);

  return (
    <div>
      <Routes>
        <Route path='' element={<Loading />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
