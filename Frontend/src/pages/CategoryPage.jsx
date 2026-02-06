import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory.jsx'
import ConfirmBox from '../components/ConfirmBox.jsx'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.js'
import { useSelector } from 'react-redux'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)

  const [loading, setLoading] = useState(false)
  const [categoryData, setcategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ name: "", image: "" })

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: ""
  })
  // const allCategory = useSelector(state => state.product.allCategory)

  // useEffect(()=>{
  //   setcategoryData(allCategory)
  // },[allCategory])


  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory

      })
      const { data: responseData } = response
            if (responseData.success) {
        setcategoryData(response.data.data)
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCategory()
    

  }, [])

  const handleDeleteCategory = async() => {
      try {
        const response = await Axios({
          ...SummaryApi.deleteCategory,
          data : deleteCategory
        })
        console.log(response)
        const {data : responseData} = response

        if(responseData.success){
          toast.success(response.message)
          fetchCategory()
          setOpenConfirmDelete(false)
        }
      } catch (error) {
        AxiosToastError(error)
      }

  }
  return (
    <section className="w-full">
      {/* Header */}
      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-semibold text-blue-400 text-base md:text-lg">CATEGORY</h2>

        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-xs md:text-sm border border-primary-100 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {/* Loader */}
      {/* No Data */}
      {!categoryData?.length && !loading && <NoData />}
      {/* Category Grid */}
      <div
        className="
      p-4
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
      gap-3
    "
      >
        {categoryData?.map((category, index) => (
          <div
            key={category._id || index}
            className="
         
          rounded-lg
          shadow-md
          overflow-hidden
          flex
          flex-col
          items-center
          justify-center
        
        "
          >
            {/* Image Wrapper */}
            <div className="w-32 h-55 rounded  overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full   object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className='flex items-center h-9 gap-2 '>
                <button onClick={() => {
                  setOpenEdit(true)
                  setEditData(category)
                }}
                  className='flex-1 bg-green-100 text-green-600 font-sans rounded hover:bg-green-200 cursor-pointer '>Edit</button>
                <button onClick={() => { setOpenConfirmDelete(true) , setDeleteCategory(category) }} className='flex-1 bg-red-100 text-red-600 font-sans rounded hover:bg-red-200 cursor-pointer '>Delete</button>
              </div>
            </div>

            {/* Name */}
            {/* <p className="text-sm font-medium text-center p-2 truncate w-full ">
              {category.name}
            </p> */}
          </div>
        ))}
      </div>

      {loading && (<Loading />)}

      {/* Upload Modal */}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {
        openEdit && (<EditCategory data={editData} close={() => setEditData(false)} fetchData={fetchCategory} />)
      }
      {
        openConfirmDelete && (<ConfirmBox close={() => setOpenConfirmDelete(false)} cancel={() => setOpenConfirmDelete(false)} confirm={handleDeleteCategory} />)
      }
    </section>

  )
}

export default CategoryPage
