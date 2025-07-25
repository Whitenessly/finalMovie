import React from 'react'
import NavBar from '../Components/NavBar'
import { MdLogout } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';

const User = () => {
    localStorage.removeItem("staffLogin")
    const nav = useNavigate()
    const userLocal = localStorage.getItem('userId')
    const pageStatus = 4
    const [user, setUser] = React.useState([]);
    if (userLocal) {
        React.useEffect(() => {
            fetch(`http://localhost:4000/users/${userLocal}`)
                .then((response) => response.json())
                .then((data) => {
                    setUser(data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }, [])
    }
    const onClickLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("staffLogin")
        nav('/home')
    }
    const onClickLogin = () => {
        nav('/login')
    }

    return (
        <div>
            {(userLocal) ?
                <div className='p-7 flex flex-col gap-5'>
                    <p className='text-2xl font-semibold'>Hello, {user.username}</p>
                    {(user.role === 'staff') ? <Link to='/staff'><div className='w-full flex flex-row justify-center items-center gap-3 text-2xl text-white bg-blue-400 py-3 rounded-lg'>Staff Mode <FaArrowRight /></div></Link> : null}
                    <div onClick={onClickLogout} className='w-full flex flex-row justify-center items-center gap-3 text-2xl text-white bg-orange-600 py-3 rounded-lg'><MdLogout /> Logout</div>
                </div>
                :
                <div className='p-7 flex flex-col gap-5 w-full h-[500px] justify-center items-center'>
                    <p className='text-2xl font-semibold text-gray-500'>No account login</p>
                    <div onClick={onClickLogin} className='text-white bg-orange-600 px-5 py-2 rounded-lg'>Log in</div>
                </div>
            }
            <NavBar pageStatus={pageStatus} />
        </div>
    )
}

export default User