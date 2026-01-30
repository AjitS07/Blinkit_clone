import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.js';

const UploadCategoryModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: "",
        image: ""
    })
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data
            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return
        }

        const response = await uploadImage(file)
        const { data: ImageResponse } = response

        setData((preve) => {
            return {
                ...preve,
                image: ImageResponse.url
            }
        })
    }
    return (
        <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-3xl w-full rounded-xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h1 className="text-lg font-semibold text-neutral-800">
                        Add Category
                    </h1>
                    <button
                        onClick={close}
                        className="text-neutral-500 hover:text-red-500 transition"
                    >
                        <IoClose size={26} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 grid gap-5" onSubmit={handleSubmit}>

                    {/* Category Name */}
                    <div className="grid gap-1 items-center">
                        <label
                            htmlFor="categoryName"
                            className="text-sm font-medium text-neutral-700"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter category name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-neutral-50 
              focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="grid gap-2">
                        <p className="text-sm font-medium text-neutral-700">Category Image</p>

                        <div className="flex flex-col lg:flex-row gap-4 items-start">

                            {/* Preview Box */}
                            <div className="h-36 w-full lg:w-36 border rounded-lg bg-neutral-50 flex items-center justify-center overflow-hidden">
                                {data.image ? (
                                    <img
                                        src={data.image}
                                        alt="category"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <p className="text-sm text-neutral-400">No Image</p>
                                )}
                            </div>

                            {/* Upload Button */}
                            <label htmlFor="uploadCategoryImage">
                                <div
                                    className={`
                  px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition 
                  ${data.name
                                            ? "bg-blue-600 text-white hover:bg-blue-500"
                                            : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                        }
                `}
                                >
                                    Upload Image
                                </div>
                                <input
                                    disabled={!data.name}
                                    onChange={handleUploadCategoryImage}
                                    type="file"
                                    id="uploadCategoryImage"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className={`
            w-full py-2.5 rounded-lg font-semibold text-white transition
            ${data.name && data.image
                                ? "bg-emerald-600 hover:bg-emerald-500"
                                : "bg-neutral-300 cursor-not-allowed"
                            }
          `}
                    >
                        Add Category
                    </button>

                </form>
            </div>
        </section>
    );

}

export default UploadCategoryModel
