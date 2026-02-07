import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
     const user = useSelector(state => state.user)
     
    return (
        <section className='bg-white'>

            <div className='w-full  mx-auto max-w-[1400px] grid lg:grid-cols-[250px_1fr]'>
                {/* left for menu */}
                <div className='p-2 sticky h-[calc(100vh-100px)] top-16 overflow-y-auto hidden lg:block border-r border-neutral-300'>
                    <div className="h-full overflow-y-auto  scrollbar-thin">

                    <UserMenu />
                    </div>
                </div>
                {/* right for content */}
                <div className=' bg-white min-h-[calc(100vh-100px)]'>
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
