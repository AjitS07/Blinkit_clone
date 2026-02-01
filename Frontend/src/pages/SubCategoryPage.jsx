import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import DisplayTable from '../components/DisplayTable.jsx'
import { createColumnHelper } from '@tanstack/react-table'
const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()

  const fetchSubCategory = async () => {
     
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
     
      const { data: responseData } = response
     
      if (responseData.success) {
        
        setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
          fetchSubCategory()
  }, [])
  const column = [
    columnHelper.accessor('name', {
      header: "Name",  

    }),
    columnHelper.accessor('image', {
      header: "Image",

      cell: ({ row }) => {

        return <div className='flex items-center justify-center'>
          <img
            src={row.original.image}
            alt={row.original.name}
            className='w-8 h-8'

          />
        </div>


      }

    }),
    columnHelper.accessor("category", {
      header: "category"
    })

  ]

  return (
    <section>
      {/* Header */}
      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-semibold text-teal-700 text-base md:text-lg">SUB CATEGORY</h2>

        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-xs md:text-sm border border-primary-100 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer"
        >
          Add Subcategory
        </button>
      </div>
      <div>
        <DisplayTable data={data}
          column={column} />

      </div>





      {
        openAddSubCategory && (
          <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
        )
      }
    </section>
  )
}

export default SubCategoryPage
