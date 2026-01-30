import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
    const currentDate = new Date()

    if (!CategoryData) return null

    const [formData, setFormData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name || '',
        image: CategoryData.image || '',
        createdAt: CategoryData.createdAt,
        updatedAt: CategoryData.editDate || null

    })

    const formatDate = (date) => {
        if (!date) return '—'
        return new Date(date).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }



    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.image) return

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: formData
            })

            if (response.data?.success) {
                toast.success(response.data.message)
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
        if (!file) return

        try {
            setImageLoading(true)
            const response = await uploadImage(file)

            setFormData(prev => ({
                ...prev,
                image: response.data.url
            }))
        } catch (error) {
            toast.error("Image upload failed")
        } finally {
            setImageLoading(false)
        }
    }

    return (
        <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-3xl w-full rounded-xl shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-neutral-800">
                        Edit Category
                    </h2>
                    <button
                        type="button"
                        onClick={close}
                        className="text-neutral-500 hover:text-red-500 transition"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 grid gap-6" onSubmit={handleSubmit}>

                    {/* Meta Info */}
                    {/* Category Meta Info */}
                    <div className="grid gap-2 text-sm text-neutral-700">

                        <p>
                            <span className="font-medium">Category ID :</span>{" "}
                            <span className="text-neutral-600">{formData._id}</span>
                        </p>

                        <p>
                            <span className="font-medium">Upload Date :</span>{" "}
                            <span className="text-neutral-600">
                                {formatDate(formData.createdAt)}
                            </span>
                        </p>

                        <p>
                            <span className="font-medium">Update Date :</span>{" "}
                            <span className="text-neutral-600">
                                {formData.updatedAt 
                                    ? formatDate(formData.updatedAt)
                                    : "None"}
                            </span>
                        </p>

                    </div>


                    {/* Category Name (Editable) */}
                    <div className="grid gap-1">
                        <label className="text-sm font-medium text-neutral-700">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder="Enter category name"
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-neutral-50
            focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="grid gap-2">
                        <p className="text-sm font-medium text-neutral-700">
                            Category Image
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-start">

                            {/* Preview */}
                            <div className="h-36 w-36 border rounded-lg bg-neutral-50 flex items-center justify-center overflow-hidden">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="category"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="text-sm text-neutral-400">No Image</span>
                                )}
                            </div>

                            {/* Upload Button */}
                            <label className="inline-block">
                                <span
                                    className={`px-5 py-2 rounded-lg text-sm font-medium transition
                ${formData.name && !imageLoading
                                            ? "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                                            : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                        }`}
                                >
                                    {imageLoading ? "Uploading..." : "Change Image"}
                                </span>

                                <input
                                    type="file"
                                    className="hidden"
                                    disabled={!formData.name || imageLoading}
                                    onChange={handleUploadCategoryImage}
                                />
                            </label>

                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !formData.name || !formData.image}
                        className={`w-full py-2.5 rounded-lg font-semibold text-white transition
          ${loading || !formData.name || !formData.image
                                ? "bg-neutral-300 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-500"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Category"}
                    </button>

                </form>
            </div>
        </section>
    )

}

export default EditCategory
