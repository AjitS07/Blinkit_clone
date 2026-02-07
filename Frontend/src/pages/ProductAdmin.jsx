import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import Loading from '../components/Loading.jsx'
import ProductCartAdmin from '../components/ProductCartAdmin.jsx'
import { IoSearch } from 'react-icons/io5'

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search : search
        }
      })
    
      const { data: responseData } = response
     
      if (responseData.success) {
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {

      setPage(preve => preve + 1)
    }

  }
  const handlePervious = () => {
    if (page > 1) {

      setPage(preve => preve - 1)
    }

  }
  const handleSearch = (e)=>{
    const { value} = e.target
    setSearch(value)
    setPage(1)

  }
  useEffect(()=>{
    let flag = true
    const interval = setTimeout(()=>{
      if(flag){

        fetchProductData()
        flag = false
      }
    },300);
    return ()=>{
      clearTimeout(interval)
    }
    
  },[search])

  return (
    <section>
      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 gap-4">

        <h2 className="font-semibold text-blue-400 text-base md:text-lg">PRODUCT</h2>
        <div className='h-9 w-full min-w-24 max-w-60 ml-auto bg-neutral-50 px-4 flex items-center gap-3 py-2  rounded-2xl  border border-neutral-200 focus-within:border-neutral-400'>
          <IoSearch size={25}/>
          <input
            type="text"
            placeholder='Search Product here...'
            className='h-full w-full px-4 py-2 bg-transparent outline-none'
            value={search}
            onChange={handleSearch}
          />
        </div>


      </div>
      {
        loading && (
          <Loading />
        )
      }
      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>

          <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-6 gap-2 '>

            {
              productData.map((p, index) => {
                return (
                  <ProductCartAdmin  data={p} />
                )
              })
            }
          </div>
        </div>
        <div className='flex justify-between my-4'>
          <button onClick={handlePervious} className='border border-primary-100 px-4 py-1 hover:bg-primary-200 rounded cursor-pointer '>Previous</button>
          <button className='w-full '>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-primary-100 px-4 py-1 hover:bg-primary-200 rounded cursor-pointer'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default ProductAdmin
