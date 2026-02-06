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
  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm
  min-h-[64px] md:min-h-[72px] lg:min-h-[80px]
  flex flex-col justify-center"
    >
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-3 py-2">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-3xl oxygen-bold tracking-tight leading-none">
              <span className="text-yellow-400">Blinkit</span>
              <span className="text-green-500">_clone</span>
            </h1>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 mx-6">
            <Search />
          </div>

          {/* User / Cart */}
          <div className="flex items-center gap-3">

            {/* Mobile User Button */}
            <button
              onClick={handleMobileUser}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200"
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
                <FaRegCircleUser size={24} />
              )}
            </button>

            {/* Desktop Section */}
            <div className="hidden lg:flex items-center gap-5">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu(p => !p)}
                    className="flex items-center gap-1 cursor-pointer select-none"
                  >
                    <p>Account</p>
                    {openUserMenu ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                  </div>

                  {openUserMenu && (
                    <div className="absolute right-0 top-10 z-50 bg-white p-4 rounded-lg shadow-lg">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectTologinPage}>Login</button>
              )}

              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-white">
                <FaOpencart size={20} />
                <p>My Cart</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="lg:hidden container mx-auto px-3 pb-2">
        <Search />
      </div>
    </header>

  )
}

export default Header
