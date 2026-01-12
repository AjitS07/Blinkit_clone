import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">

        <p>All Rights Reserved By Ajit Sharma - 2025 ~</p>

        <div className="flex items-center gap-4 justify-center p-2 text-2xl">
          <a href="#" className="text-gray-600 hover:text-primary-100 transition">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-600 hover:text-primary-100 transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-primary-100 transition">
            <FaLinkedinIn />
          </a>

          
        </div>

      </div>
    </footer>
  )
}

export default Footer
