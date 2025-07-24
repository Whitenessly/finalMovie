import React from 'react'
import { HomeOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { HiOutlineTicket } from "react-icons/hi2";
import { Link } from 'react-router';

const NavBar = (props) => {
  return (
    <div className='w-full h-88px fixed z-10 bottom-0 bg-white flex flex-row items-center justify-around text-gray-500 text-2xl py-3 border-t-2 border-gray-200'>
      <Link to="/home">{(props.pageStatus === 1) ? <div className='bg-orange-600 rounded-xl px-2 py-1 gap-1 text-white flex flex-row items-center'><HomeOutlined />Home</div> : <HomeOutlined />}</Link>
      <Link to="/search">{(props.pageStatus === 2) ? <div className='bg-orange-600 rounded-xl px-2 py-1 gap-1 text-white flex flex-row items-center'><SearchOutlined />Search</div> : <SearchOutlined />}</Link>
      <Link to="/tickets">{(props.pageStatus === 3) ? <div className='bg-orange-600 rounded-xl px-2 py-1 gap-1 text-white flex flex-row items-center'><HiOutlineTicket />Tickets</div> : <HiOutlineTicket />}</Link>
      <Link to='/user'>{(props.pageStatus === 4) ? <div className='bg-orange-600 rounded-xl px-2 py-1 gap-1 text-white flex flex-row items-center'><UserOutlined />User</div> : <UserOutlined />}</Link>
    </div>
  )
}

export default NavBar