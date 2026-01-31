import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'

const SubCategoryPage = () => {
  const [openAddSubCategory,setOpenAddSubCategory]= useState(false)
  return (
    <section>
      {/* Header */}
      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-semibold text-teal-700 text-base md:text-lg">SUB CATEGORY</h2>

        <button
          onClick={()=>setOpenAddSubCategory(true)}
          className="text-xs md:text-sm border border-primary-100 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer"
        >
          Add Subcategory
        </button>
      </div>
      {
        openAddSubCategory &&(
          <UploadSubCategoryModel close={()=>setOpenAddSubCategory(false)} />
        )
      }
    </section>
  )
}

export default SubCategoryPage
