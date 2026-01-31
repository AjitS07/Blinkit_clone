import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
     const user = useSelector(state => state.user)
     
    return (
        <section className='bg-white'>

            <div className='container  mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
                {/* left for menu */}
                <div className='py-2 sticky max-h-[calc(100vh-100px)] top-24 overflow-y-auto hidden lg:block border-r border-neutral-300'>
                    <UserMenu />
                </div>
                {/* right for content */}
                <div className=' bg-white min-h-[75vh]'>
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
