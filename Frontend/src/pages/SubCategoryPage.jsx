import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import DisplayTable from '../components/DisplayTable.jsx'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage.jsx'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import EditSubCategory from '../components/EditSubCategory.jsx'
const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageUrl, setImageUrl] = useState("")
  const [openSubEdit,setOpenSubEdit]= useState(false)
  const [editSubData,setEditSubData] = useState({
    id : ""
  })

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
            className='w-8 h-8 cursor-pointer'
            onClick={() => {
              setImageUrl(row.original.image)
            }}

          />
        </div>


      }

    }),
    columnHelper.accessor("category", {
      header: "category",
      cell: ({ row }) => {
        return (
          <>
            {
              row.original.category.map((c, index) => {
                return (
                  <p key={c._id + "table"} className='shadow-md px-1 inline-block' >{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className=" flex items-center justify-center gap-2">
            <button onClick={()=>{
              setOpenSubEdit(true)
              setEditSubData(row.original)
            }} >
              <FiEdit
                className="text-blue-600 cursor-pointer hover:text-blue-800 "
                size={16}
              />
            </button>
            <button>
              <FiTrash2
                className="text-red-600 cursor-pointer hover:text-red-800 "
                size={16}
              />
            </button>
          </div>
        )
      }
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
      {
        imageUrl &&
        <ViewImage url={imageUrl} close={() => setImageUrl("")} />
      }
      {
        openSubEdit &&
        <EditSubCategory 
         data={editSubData} 
         close={()=>setOpenSubEdit(false)} 
         fetchData={fetchSubCategory}
         />
      }
    </section>
  )
}

export default SubCategoryPage
