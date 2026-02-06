import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { CiWarning } from "react-icons/ci";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModel = ({ close ,fetchData}) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })
    const allCategory = useSelector(state => state.product.allCategory)
    console.log('all category subcategory  ', allCategory)
    const handleChange = (e) => {
        const { name, value } = e.target
        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const response = await uploadImage(file)
        const { data: ImageResponse } = response
        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: ImageResponse.url
            }
        })

    }
    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el.id === categoryId)
        subCategoryData.category.splice(index, 1)
        setSubCategoryData((preve) => {
            return {
                ...preve
            }
        })
    }
    const handleSubmitSubCategory = async(e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.createSubcategory,
                data : subCategoryData
              })
              const {data : responseData} = response
              console.log("subcategory response", responseData)
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }
                if(fetchData){
                  fetchData()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
      <section className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  <div className="w-full max-w-4xl bg-white rounded shadow-2xl">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-2 border-b border-neutral-400">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">
          Add Sub Category
        </h1>
        <p className="text-sm text-slate-500">
          Create and organize sub categories
        </p>
      </div>

      <button
        onClick={close}
        className="text-slate-400 hover:text-red-500 transition"
      >
        <IoClose size={22} />
      </button>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmitSubCategory}
      className="px-6 py-4 grid gap-5"
    >

      {/* Sub Category Name */}
      <div className="grid gap-1">
        <label className="text-sm font-medium  text-slate-700">
          Sub Category Name
        </label>
        <input
          name="name"
          value={subCategoryData.name}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Mobile Accessories"
          className="
            h-8 px-3 text-sm rounded-md
            border border-slate-300 bg-slate-50
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
      </div>

      {/* Image Upload */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700">
          Sub Category Image
        </label>

        <div className="flex items-center gap-4">
          {/* Preview */}
          <div className="h-32 w-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
            {!subCategoryData?.image ? (
              <div className="text-center items-center justify-center text-slate-400">
                <CiWarning size={24} />
                <p className="text-xs mt-1">No Image</p>
              </div>
            ) : (
              <img
                src={subCategoryData.image}
                alt="SubCategory"
                className="h-full w-full object-contain rounded-lg p-2"
              />
            )}
          </div>

          {/* Upload Button */}
          <label htmlFor="uploadSubCategoryImage">
            <div className="
              px-2 py-1 text-sm font-medium text-blue-600
              border border-blue-600 rounded-md cursor-pointer
              hover:bg-indigo-50 transition
            ">
              Upload Image
            </div>
            <input
              type="file"
              id="uploadSubCategoryImage"
              className="hidden"
              onChange={handleUploadSubCategoryImage}
            />
          </label>
        </div>
      </div>

      {/* Category Select */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700">
          Select Category
        </label>

        <div className="border border-neutral-400 rounded-md p-2">
          {/* Selected */}
          <div className="flex flex-wrap gap-2 ">
            {subCategoryData.category.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center gap-1 px-3 py-1 text-xs
                bg-indigo-50 text-indigo-700 rounded-full"
              >
                {cat.name}
                <span
                  onClick={() => handleRemoveCategorySelected(cat._id)}
                  className="cursor-pointer hover:text-red-500"
                >
                  <IoClose size={12} />
                </span>
              </div>
            ))}
          </div>

          {/* Dropdown */}
          <select
            className="w-full h-10 text-sm outline-none bg-transparent"
            onChange={(e) => {
              const categoryDetails = allCategory.find(
                (el) => el._id === e.target.value
              );
              if (!categoryDetails) return;

              setSubCategoryData((prev) => ({
                ...prev,
                category: [...prev.category, categoryDetails],
              }));
            }}
          >
            <option value="">Select Category</option>
            {allCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          disabled={
            !subCategoryData?.name ||
            !subCategoryData?.image ||
            !subCategoryData?.category.length
          }
          className={`
            px-6 py-2 text-sm font-medium rounded-md transition
            ${
              subCategoryData?.name &&
              subCategoryData?.image &&
              subCategoryData?.category.length
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          Save Sub Category
        </button>
      </div>

    </form>
  </div>
</section>

    )
}

export default UploadSubCategoryModel
