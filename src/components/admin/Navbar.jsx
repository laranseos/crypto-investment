import React from 'react'
import AdminLogo from '../../assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { HiBellAlert } from 'react-icons/hi2'
import { VscSignOut } from 'react-icons/vsc'
import QRCode from 'react-qr-code'
import 'react-toastify/dist/ReactToastify.css'
import './navbar.css'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { logout } from '../../slices/authSlice'
import { useContext } from 'react'
import { BalanceContext } from '../../context/balanceContext'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {balance} = useContext(BalanceContext);

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      navigate('/');
      dispatch(logout());
      console.log(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className='bg-white border-gray-200 rounded dark:bg-slate-900 shadow-md shadow-black w-full top-0 h-20 sticky'>
      <div className='flex lg:w-[1280px] w-full mx-auto'>
        <Link to={'/'}>
            <img src={AdminLogo} alt='logo' className='w-20 ml-8'/>
        </Link>
        <span className='ml-8 my-auto bg-slate-800 shadow-md shadow-black px-4 py-2 rounded-xl text-yellow-300 font-bold text-2xl font-mono'>${balance}</span>
        <li
          className="flex items-center gap-x-2 p-3 ml-auto mr-8 text-base font-normal rounded-lg cursor-pointer hover:text-white text-gray-300"
          onClick={logoutHandler}
        >
          <span className='text-2xl'><VscSignOut /></span>
          <span
            className='origin-left duration-300'
          >
            Sign Out
          </span>
        </li>
      </div>
    </nav>
  )
}

export default Navbar
