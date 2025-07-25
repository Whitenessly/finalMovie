import React from 'react'
import { Input, Space } from 'antd';
import { Navigate, useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons'


const Staff = () => {
    localStorage.removeItem("staffLogin")
    const nav = useNavigate()
    const userLocal = localStorage.getItem('userId')
    if (!userLocal) {
        return <Navigate to={"/home"} />;
    }
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
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const [staffPassInput, setStaffPassInput] = React.useState()
    const [staffPassInputWarning, setStaffPassInputWarning] = React.useState('')
    const onChangeStaffPassInput = (e) => {
        setStaffPassInput(e.target.value)
    }
    const onConfirm = (event) => {
        event.preventDefault();
        if (staffPassInput === user.staffPass) {
            setStaffPassInputWarning('')
            localStorage.setItem('staffLogin', true)
            nav('/staff/ticket')
        } else {
            setStaffPassInputWarning('Password incorrect')
        }
    }
    const onClickReturn = () => {
        localStorage.removeItem("staffLogin")
        nav('/home');
    }

    return (
        <>
            <div className='w-full py-3 px-5 font-bold bg-white fixed top-0'>
                <p onClick={onClickReturn} className=''><LeftOutlined /> Back to home</p>
            </div>
            <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-50 gap-5'>
                <div className='text-lg'>Enter your staff password</div>
                <div className='flex flex-col gap-1'>
                    <Space direction="vertical">
                        <Input.Password onChange={onChangeStaffPassInput} placeholder="input password" />
                    </Space>
                    <div className='text-red-500'>{staffPassInputWarning}</div>
                </div>
                <div onClick={onConfirm} className='text-white bg-blue-400 text-xl px-5 py-2 rounded-lg'>Confirm</div>
            </div>

        </>

    )
}

export default Staff