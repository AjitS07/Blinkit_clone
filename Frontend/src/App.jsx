
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast'
import fetchUserDetails from './utils/fetchUserDetails'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import {setAllCategory, setAllsubCategory} from './store/productSlice'
import Axios from './utils/Axios.js'
import SummaryApi from './common/SummaryApi'





function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)


  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    if (userData?.data) {
      dispatch(setUserDetails(userData.data))
    }
  }

  const fetchCategory = async () => {
    try {

      const response = await Axios({
        ...SummaryApi.getCategory

      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(response.data.data))
        // setcategoryData(response.data.data)
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }


   const fetchSubCategory = async () => {
    try {

      const response = await Axios({
        ...SummaryApi.getSubCategory

      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllsubCategory(response.data.data))
        // setcategoryData(response.data.data)
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    fetchSubCategory()
    fetchCategory()

    const token = localStorage.getItem("accesstoken");

    if (token) {
      fetchUser();   // ✔ sirf login hone pe
    }
  }, []);


  return (

    <>
      <div className='min-h-screen flex flex-col'>

        <Header />
        < main className='flex-grow '>
          <Outlet />

        </main>
        <Footer />
        <Toaster />

      </div>

    </>

  )
}

export default App
