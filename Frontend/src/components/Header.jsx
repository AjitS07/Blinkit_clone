import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { FaOpencart } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import UserMenu from './UserMenu';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()

  const user = useSelector((state) => state?.user)

  const [openUserMenu, setOpenUserMenu] = useState(false)

  // console.log('user from store ', user)

  const redirectTologinPage = () => {
    navigate("/login")
  }
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }
    
    navigate("/userMobile")


  }

  // console.log("location", location)
  // console.log("isSearchPage", isSearchPage)
  // console.log("ismobile", isMobile)

  return (
    <header className='h-20 lg:h-18 lg:shadow-md sticky top-0
     flex flex-col justify-center items-center gap-1  bg-white z-50'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between  lg:h-full'>
            {/* Logo */}
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center'>
                <h1 className="text-2xl md:text-4xl oxygen-bold tracking-tight ">
            <span className="text-yellow-400">Blinkit</span>
            <span className="text-green-500">_clone</span>
            </h1>
                {/* <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block' />
                <img src={logo} alt="logo" width={170} height={60} className='lg:hidden px-2' /> */}
              </Link>
            </div>
            {/* search */}
            <div className='hidden lg:block'>
              <Search />

            </div>
            {/* login and add my cart */}
            <div className=''>
              {/* user icons display in only mobile version */}
              {/* <button className='text-neutral-500 lg:hidden p-2 cursor-pointer' onClick={handleMobileUser}>
                <FaRegCircleUser size={26} />
              </button> */}
              <button
                onClick={handleMobileUser}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 text-neutral-500"
              >
                {user?._id ? (
                  user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-semibold uppercase">
                      {user?.name?.charAt(0)}
                    </span>
                  )
                ) : (
                  <FaRegCircleUser size={26} />
                )}
              </button>


              {/* Desktop part */}
              <div className='hidden lg:flex items-center gap-5'>
                {/* <Link to={"/login"}>login</Link> */}
                {
                  user?._id ? (
                    <div className='relative'>
                      <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <TiArrowSortedUp size={20} />

                          ) : (

                            <TiArrowSortedDown size={20} />
                          )
                        }



                      </div>
                      {openUserMenu && (
                        <div className="absolute right-0 top-12 z-50">
                          <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
                            <UserMenu close={handleCloseUserMenu} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (

                    <button className='cursor-pointer text-lg px-2' onClick={redirectTologinPage}>Login</button>
                  )
                }
                <button className='flex items-center gap-1 bg-secondary-200 hover:bg-green-700 px-2 py-2 rounded text-white cursor-pointer'>
                  {/* add to card icons */}
                  <div className='animate-bounce'>
                    <FaOpencart size={20} />
                  </div>
                  <div className='font-medium'>
                    <p>My Cart</p>

                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }
      <div className='container mx-auto px-2  lg:hidden '>
        <Search />
      </div>
    </header>
  )
}

export default Header
