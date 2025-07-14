import React from 'react'
import Logo from '../assets/Logo.svg'
import Loading from '../Components/Loading';
import { Link, useNavigate } from 'react-router'

const Login = () => {
    const nav = useNavigate();

    const [loadingStatus, setLoadingStatus] = React.useState(true);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:4000/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoadingStatus(false);
            })
    }, []);
    console.log(users);

    const [usernameOrEmailValue, setUsernameOrEmailValue] = React.useState();
    const [passwordValue, setPasswordValue] = React.useState();

    const [warning, setWarning] = React.useState();

    const onChangeUsernameOrEmail = (event) => {
        setUsernameOrEmailValue(event.target.value);
    }
    const onChangePassword = (event) => {
        setPasswordValue(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        const user = users.find(user => (user.username === usernameOrEmailValue || user.email === usernameOrEmailValue) && user.password === passwordValue);
        if (user) {
            setWarning('');
            nav('/home');
        } else {
            setWarning('Invalid username/email or password');
        }
    }

    return (
        <>
            {loadingStatus ? (<Loading />) : (
                <div className='w-screen h-screen flex flex-col items-center justify-between py-4 px-8'>
                    <div className='w-full flex flex-col items-center gap-2'>
                        <img className='aspect-square w-[90px]' src={Logo} alt="Logo" />
                        <p className='font-bold text-xl'>Welcome back</p>
                        <p className='text-[#A9A2A3] text-center text-sm'>
                            Login into your account.
                        </p>
                        <form className='w-full flex flex-col mt-2'>
                            <input onChange={onChangeUsernameOrEmail} type="text" className='text-sm border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Username or Email' />
                            <div className='pl-3 text-red-500 text-sm h-6'></div>
                            <input onChange={onChangePassword} type="password" className='text-sm border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-[#FF515A] ' placeholder='Password' />
                            <div className='pl-3 text-red-500 text-sm h-6'>{warning}</div>
                            <div onClick={onSubmit} className='text-sm w-full px-5 py-3 rounded-lg bg-[#FF515A] text-white text-center'>Login</div>
                        </form>
                    </div>
                    <div className='text-sm'>Didn't have an account? <Link to={'/signup'} className='text-[#FF515A] text-sm'>Sign up</Link></div>
                </div>
            )}
        </>

    )
}

export default Login