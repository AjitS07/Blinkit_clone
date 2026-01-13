import React, { useState } from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPasswword] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

        console.log("data", data)
    }
    const validevalue = Object.values(data).every(el => el)

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <section className=' w-full container mx-auto px-2'>
            <div className='bg-white my-4  w-full max-w-lg mx-auto rounded p-4 '>
                <p>Welcome to Blinkit_cone</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="name">Name :</label>
                        <input type="text"
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2  rounded'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your Name'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                            id='email'

                            className='bg-blue-50 p-2 rounded'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='abc@gmail.com '
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor="password">Password:</label>
                        <div className='bg-blue-50 p-2 rounded flex items-center  focus-within:border-secondary-200'>
                            <input type={showPassword ? "text" : "password"}
                                id='password'
                                autoFocus
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (<FiEye />) : (<FiEyeOff />)
                                }
                            </div>
                        </div>

                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <div className='bg-blue-50 p-2 rounded flex items-center  focus-within:border-secondary-200'>
                            <input type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                autoFocus
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.showConfirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm Password'
                            />
                            <div onClick={() => setShowConfirmPasswword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (<FiEye />) : (<FiEyeOff />)
                                }
                            </div>
                        </div>

                    </div>

                    <button className={`${validevalue ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"} py-2 rounded font-semibold text-white  my-3 tracking-wide cursor-pointer `}>Register</button>
                </form>
            </div>
        </section>

    )
}

export default Register 
