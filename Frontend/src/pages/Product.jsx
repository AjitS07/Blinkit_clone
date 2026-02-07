import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi'

const Product = () => {
    const [productData,setProductData] = useState([])
    const [page,setPage] = useState(1)
    const fetchProductData = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.getProduct,
                data : {
                    page : page,
                }
            })
            const {data : responseData} = response
            console.log("response data",responseData)
            if(responseData.success){
                setProductData(response.data)
            }
        } catch (error) {
            AxiosToastError(error)
            
        }
    }
    useEffect(()=>{
        fetchProductData()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Product
