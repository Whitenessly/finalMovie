import React from 'react'
import Logo from '../assets/Logo.svg'
import { Link, useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons'


const SignUp = () => {
    localStorage.removeItem("staffLogin")
    const userLocal = localStorage.getItem('userId')
    if (userLocal) {
        return <Navigate to={"/home"} />;
    }
    const nav = useNavigate();

    const [usernameValue, setUsernameValue] = React.useState();
    const [emailValue, setEmailValue] = React.useState();
    const [passwordValue, setPasswordValue] = React.useState();
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState();

    const [warningUsername, setWarningUsername] = React.useState();
    const [warningEmail, setWarningEmail] = React.useState();
    const [warningPassword, setWarningPassword] = React.useState();
    const [warningConfirmPassword, setWarningConfirmPassword] = React.useState();

    const onChangeUsername = (event) => {
        setUsernameValue(event.target.value);
        if (event.target.value.length < 3 && event.target.value.length > 0) {
            setWarningUsername('Username must be at least 3 characters long');
        } else if (event.target.value.length > 20) {
            setWarningUsername('Username must be less than 20 characters long');
        } else {
            setWarningUsername('');
        }
    }
    const onChangeEmail = (event) => {
        setEmailValue(event.target.value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(event.target.value) && event.target.value.length > 0) {
            setWarningEmail('Invalid email format');
        } else {
            setWarningEmail('');
        }
    }
    const onChangePassword = (event) => {
        setPasswordValue(event.target.value);
        if (event.target.value.length < 8 && event.target.value.length > 0) {
            setWarningPassword('Password must be at least 8 characters long');
        } else {
            setWarningPassword('');
        }
    }
    const onChangeConfirmPassword = (event) => {
        setConfirmPasswordValue(event.target.value);
        if (passwordValue !== event.target.value && event.target.value.length > 0) {
            setWarningConfirmPassword('Passwords do not match');
        } else {
            setWarningConfirmPassword('');
        }
    }

    const [notiModal, setNotiModal] = React.useState(false)
    const onClickNotiModal = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (passwordValue === confirmPasswordValue && passwordValue.length >= 8 && emailPattern.test(emailValue) && emailValue.length > 0 && usernameValue.length >= 3 && usernameValue.length <= 20) {
            setNotiModal(true)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();

        const body = {
            id: `${Date.now()}`,
            username: `${usernameValue}`,
            email: `${emailValue}`,
            password: `${passwordValue}`,
            role: "user"
        }

        await fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        nav('/login');
    };
    const onClickReturn = () => {
        history.back()
    }

    return (
        <>
            <div className='w-full py-3 px-5 font-bold bg-white fixed top-0'>
                <p onClick={onClickReturn} className=''><LeftOutlined /></p>
            </div>
            <div className='w-screen h-screen flex flex-col items-center justify-between pb-4 px-8 pt-15'>
                <div className='w-full flex flex-col items-center gap-2'>
                    <img className='aspect-square w-[90px]' src={Logo} alt="Logo" />
                    <p className='font-bold text-xl'>Create New Account</p>
                    <p className='text-[#A9A2A3] text-center text-sm'>
                        Set up your username and password.
                        <br />
                        You can always change it later.
                    </p>
                    <form className='w-full flex flex-col mt-2'>
                        <input onChange={onChangeUsername} type="text" className='text-sm border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Username' />
                        <div className='pl-3 text-red-500 text-sm h-6'>{warningUsername}</div>
                        <input onChange={onChangeEmail} type="text" className='text-sm border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Email' />
                        <div className='pl-3 text-red-500 text-sm h-6'>{warningEmail}</div>
                        <input onChange={onChangePassword} type="password" className='text-sm border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Password' />
                        <div className='pl-3 text-red-500 text-sm h-6'>{warningPassword}</div>
                        <input onChange={onChangeConfirmPassword} type="password" className='text-sm border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Confirm password' />
                        <div className='pl-3 text-red-500 text-sm h-6'>{warningConfirmPassword}</div>
                        <div onClick={onClickNotiModal} className='text-sm w-full px-5 py-3 rounded-lg bg-[#FF515A] text-white text-center'>Sign up</div>
                    </form>
                </div>
                <div className='text-sm'>Already have an account? <Link to={'/login'} className='text-[#FF515A] text-sm'>Log in</Link></div>
            </div>
            {(notiModal) ?
                <div className='w-full h-full fixed z-10 top-0 bg-black/50 flex justify-center items-center'>
                    <div className='bg-white p-5 rounded-xl flex flex-col items-center gap-5'>
                        <p className='font-semibold text-lg'>Account created succesfully</p>
                        <p className='text-orange-500'>/* Now please login to your account */</p>
                        <div onClick={onSubmit} className='flex flex-row justify-center bg-orange-600 text-white w-full py-2 rounded-lg'>Back to Login</div>
                    </div>
                </div>
                : null
            }
        </>

    )
}

export default SignUp