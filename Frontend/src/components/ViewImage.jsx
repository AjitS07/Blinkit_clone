import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/70 z-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md max-h-[80vh] p-4 bg-white rounded-md'>
        <button
        className='w-fit ml-auto block cursor-pointer hover:text-red-500'
        onClick={close} 
        ><IoClose size={25}/></button>
        <img src={url}
        alt='Full Screen'
        className='w-full h-full object-scale-down' />
      </div>
    </div>
  )
}

export default ViewImage
