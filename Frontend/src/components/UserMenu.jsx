import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    const user = useSelector((state) => state.user)
    return (
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm'>{user.name || user.mobile} </div>

            <div>
                <Link to={""}>My Orders</Link>
                <Link to = {""}>Save Address</Link>
                <button>Logout</button>
                
            </div>
            
        </div>
    )
}

export default UserMenu
