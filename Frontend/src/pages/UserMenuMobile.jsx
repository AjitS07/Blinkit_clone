import React from 'react'
import UserMenu from '../components/UserMenu'
import {IoClose} from "react-icons/io5"

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full p-4'>

        <button
          onClick={() =>window.history.back()}
          className="text-neutral-500 text-xl block w-fit ml-auto"
        >
          <IoClose size ={20}/>
        </button>

      <div className='container mx-auto p-3'>
        <UserMenu />
      </div>
    </section>
  )
}



export default UserMenuMobile
