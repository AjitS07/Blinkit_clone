import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../utils/UploadImage.js'
import ViewImage from '../components/ViewImage.jsx'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { connect, useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import AddFieldComponent from '../components/AddFieldComponent.jsx'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import successAlert from '../utils/SuccessAlert.js'

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subcategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},

  })
  const [imageLoading, setImageLoading] = useState(false)
  const [ViewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [moreField, setMoreField] = useState([])
  const [openAddFiled, setOpenAddFiled] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const handleChnage = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })

  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response

    const imageUrl = ImageResponse.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
  }
  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })

  }
  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {

        ...preve
      }
    })
  }
  const handleRemoveSubCategory = async (index) => {
    data.subcategory.splice(index, 1)
    setData((preve) => {
      return {

        ...preve
      }
    })
  }
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }

      }
    })
    setFieldName("")
    setOpenAddFiled(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
       try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        successAlert(responseData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subcategory: [],
          unit: [],
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},

        })
      }

    } catch (error) {

      AxiosToastError(error)

    }

  }
  return (
    <section>
      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-semibold text-blue-400 text-base md:text-lg">UPLOAD PRODUCT</h2>

        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-xs md:text-sm border border-primary-100 hover:bg-primary-200 px-3 py-1 rounded"
        >
          UPLOAD PRODUCT
        </button>
      </div>
      <div className='grid p-3'>
        <form onSubmit={handleSubmit} className='grid gap-2'>
          <div className='grid gap-1'>

            <label htmlFor="name">Name</label>
            <input type="text"
              id='name'
              name='name'
              placeholder='Enter product name'
              value={data.name}
              onChange={handleChnage}
              required
              className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded'
            />

          </div>
          <div className='grid gap-1'>

            <label htmlFor="description">Description</label>

            <textarea type="text"
              id='description'
              name='description'
              placeholder='Description here'
              value={data.description}
              onChange={handleChnage}
              required
              multiple
              rows={2}
              className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded resize-none'
            />

          </div>
          <div>
            <p>image</p>
            <div>
              <label htmlFor='profuctImage' className='bg-neutral-100 h-24 border rounded flex justify-center items-center cursor-pointer '>
                <div className='text-center flex justify-center items-center flex-col' >
                  {
                    imageLoading ?
                      (
                        <div role="status">
                          <svg aria-hidden="true" className="inline w-8 h-8 text-neutral-200 animate-spin fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span> </div>) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Upload Image</p>
                        </>
                      )

                  }
                </div>
                <input type="file"
                  id='profuctImage'
                  className='hidden'
                  accept='image/*'
                  onChange={handleUploadImage}
                />
              </label>

              {/* display Upload image */}
              <div className=' flex flex-wrap gap-4 '>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className=' shadow-md mt-1 h-20 w-20 min-w-20 bg-blue-50  rounded relative group'>
                        <img src={img} alt={img}
                          onClick={() => setViewImageUrl(img)}
                          className='w-full h-full object-scale-down  rounded-md cursor-pointer' />

                        {/* button */}
                        <div className=" absolute bottom-0 right-0 p-1 h-7 bg-white rounded hidden group-hover:block ">

                          <button
                            onClick={() => handleDeleteImage(index)}
                          >
                            <FiTrash2
                              className="text-red-600 cursor-pointer hover:text-red-800 "
                              size={20}
                            />
                          </button>
                        </div>


                      </div>
                    )
                  })
                }

              </div>

            </div>
          </div>

          <div>
            <label htmlFor="">Category</label>
            <div>

              <select name="" id=""
                className='bg-blue-50 border w-full p-2 rounded '
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category]
                    }
                  })
                  setSelectCategory("")
                }}
              >
                <option value="">Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "Productsection"}
                        className='flex items-center gap-1 mt-2 shadow-md' >
                        <p>{c.name}</p>
                        <span
                          onClick={() => handleRemoveCategory(c._id)}
                          className="cursor-pointer hover:text-red-500 "
                        >
                          <IoClose size={20} />
                        </span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="">Sub Category</label>
            <div>

              <select name="" id=""
                className='bg-blue-50 border w-full p-2 rounded '
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subcategory = allSubCategory.find(el => el._id === value)


                  setData((preve) => {
                    return {
                      ...preve,
                      subcategory: [...preve.subcategory, subcategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
              >
                <option value="">Select SubCategory</option>
                {Array.isArray(allSubCategory) &&
                  allSubCategory.map(c => (
                    <option key={c._id} value={c?._id}>
                      {c.name}
                    </option>
                  ))
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subcategory.map((c, index) => {
                    return (
                      <div key={c._id + index + "subCategory"}
                        className='flex items-center gap-1 mt-2 shadow-md' >
                        <p>{c.name}</p>
                        <span
                          onClick={() => handleRemoveSubCategory(c._id)}
                          className="cursor-pointer hover:text-red-500 "
                        >
                          <IoClose size={20} />
                        </span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>


          <div className='grid gap-1'>

            <label htmlFor="unit">Unit</label>
            <input type="text"
              id='unit'
              name='unit'
              placeholder='Enter product unit'
              value={data.unit}
              onChange={handleChnage}
              required
              className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded'
            />

          </div>


          <div className='grid gap-1'>

            <label htmlFor="stock">Number. of Stock</label>
            <input type="number"
              id='stock'
              name='stock'
              placeholder='Enter product stock'
              value={data.stock}
              onChange={handleChnage}
              required
              className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded'
            />

          </div>


          <div className='grid gap-1'>

            <label htmlFor="price">Price</label>
            <input type="number"
              id='price'
              name='price'
              placeholder='Enter product price'
              value={data.price}
              onChange={handleChnage}
              required
              className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded'
            />

          </div>

          <div className='grid gap-1'>

            <label htmlFor="discount">Price Discount</label>
            <input type="number"
              id='discount'
              name='discount'
              placeholder='Enter product discount'
              value={data.discount}
              onChange={handleChnage}
              required
              className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded'
            />

          </div>


          {/* add more fields  */}
          <div>
            {
              Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div>
                    <div className='grid gap-1'>

                      <label htmlFor={k}>{k}</label>
                      <input type="text"
                        id={k}
                        value={data?.more_details[k]}
                        onChange={(e) => {
                          const value = e.target.value
                          setData((preve) => {
                            return {
                              ...preve,
                              more_details: {
                                ...preve.more_details,
                                [k]: value
                              }
                            }
                          })
                        }}
                        required
                        className='bg-blue-50 p-2 outline-none border border-neutral-400 focus-within:border-t-teal-500 rounded'
                      />

                    </div>

                  </div>
                )

              })
            }
          </div>


          <div onClick={() => setOpenAddFiled(true)} className='inline-block bg-white hover:bg-primary-100 py-1 px-3 w-32 text-center font-semibold border border-primary-100 hover:text-black cursor-pointer rounded '>
            Add Fields
          </div>
          <button className='bg-blue-500 hover:bg-blue-400 py-2 rounded font-semibold text-white cursor-pointer  '>
            Submit
          </button>


        </form>
      </div>
      {
        ViewImageUrl && (
          <ViewImage url={ViewImageUrl} close={() => setViewImageUrl("")} />
        )
      }
      {
        openAddFiled && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddFiled(false)}
          />
        )
      }

    </section>
  )
}

export default UploadProduct
