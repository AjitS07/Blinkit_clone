import React, { useState } from 'react'
import uploadImage from '../utils/UploadImage'

const UploadCategoryModel = ({ close }) => {
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    const handleOnChange = async (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.file[0]
        if(!file){
            return
        }
        const uploadImage = await uploadImage(file)

        console.log(uploadImage)

    }

    return (
        <section className="fixed inset-0 z-50 bg-neutral-800/60 flex items-center justify-center p-4">
            <div className="bg-white max-w-4xl w-full p-4 rounded-lg">

                {/* Header */}
                <div className="flex items-center justify-between border-b pb-2">
                    <h1 className="font-semibold text-lg">
                        Category
                    </h1>

                    <button onClick={close}
                        className="border border-amber-500 text-amber-600
                     hover:bg-amber-400 hover:text-white
                     text-sm px-3 py-1 rounded transition"
                    >
                        Close
                    </button>
                </div>
                <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label id='categoryName'>Name</label>
                        <input type="text" name="name" id="categoryName"
                            placeholder='Enter category name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='bg-blue-50 p-2 border border-blue-100
                             focus-within:border-primary-100 outline-none rounded'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex gap-4 flex-col  lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full  lg:w-36 flex items-center justify-center rounded '>
                                <p className='text-sm text-neutral-500'>No Image</p>
                            </div>
                            <label htmlFor="uploadCategoryImage">

                                <div className={`
                            ${!data.name ? 'bg-gray-400' : "bg-primary-100"}
                            px-4 py-2 rounded cursor-pointer 
                                `}>Upload Image</div>
                                <input disabled = {!data.name} onChange= { handleUploadCategoryImage} type="file" id='uploadCategoryImage' className='
                                hidden'/>
                            </label>

                        </div>

                    </div>
                </form>

            </div>
        </section>
    )

}

export default UploadCategoryModel
