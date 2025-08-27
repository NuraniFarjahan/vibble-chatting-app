import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Sidebar } from '../components/sidebar/Sidebar'
import { useSelector } from 'react-redux'

const RootLayout = () => {

  const user= useSelector((state)=>state.userInfo.value)
  const navigate=useNavigate()


  useEffect(() => {
    if (user===null) {
      navigate("/login")
    }
  }, [])
  
  

  return (
    <div className='flex justify-start items-start flex-wrap'>
        <Sidebar/>
<Outlet/>
    </div>
  )
}

export default RootLayout