import React from 'react'
import Logo from '../assets/Logo.svg'

const Loading = () => {

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <img src={Logo} alt="" />
    </div>
  )
}

export default Loading