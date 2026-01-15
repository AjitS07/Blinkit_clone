
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast'

function App() {
 

  return (
  
   <>
   <div className='min-h-screen flex flex-col'>

    <Header/>
   < main  className='flex-grow '>
      <Outlet/>

   </main>
   <Footer/>
   <Toaster/>
   
   </div>
   
   </>
  
  )
}

export default App
