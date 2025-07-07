import React from 'react'
import Logo from '../assets/Logo.svg'
import { Link } from 'react-router';

const SignUp = () => {

    const body ={
        username: "Wsly",
        email: "whitenessly@gmail.com",
        password: "23212332"
    }

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-between py-4 px-8'>
            <div className='w-full flex flex-col items-center gap-3'>
                <img src={Logo} alt="Logo" />
                <p className='font-bold text-2xl'>Create New Account</p>
                <p className='text-[#A9A2A3] text-center'>
                    Set up your username and password.
                    <br />
                    You can always change it later.
                </p>
                <form className='w-full flex flex-col gap-3'>
                    <input type="text" className='border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Username'/>
                    <input type="email" className='border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Email' />
                    <input type="password" className='border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Password' />
                    <input type="password" className='border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Confirm password' />
                    <button className='w-full px-5 py-3 rounded-lg bg-[#FF515A] text-white'>Sign up</button>
                </form>
            </div>
            <div>Already have an account? <Link to={'/login'} className='text-[#FF515A]'>Log in</Link></div>
        </div>
    )
}

export default SignUp