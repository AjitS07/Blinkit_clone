import React from 'react'

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Branding</h1>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search..."
            className="px-4 py-2 rounded-full border text-sm outline-none"
          />
          <button className="px-4 py-2 rounded-full border text-sm">
            Light
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">Diet Lam</span>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full border text-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-700 text-white text-sm">
            + Add Product
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        
        {/* Left Form */}
        <div className="bg-neutral-50 rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Your Brand</h3>
          <p className="text-sm text-neutral-500 mb-6">
            Preview your brand product.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Brand name" />
            <Select label="Font Family" />
            <Input label="Distributor City" />
            <Input label="Distributor Zip" />
          </div>

          {/* Upload */}
          <div className="mt-5 border border-dashed rounded-xl p-6 text-center">
            <p className="text-sm text-neutral-500">
              Upload your logo or{" "}
              <span className="underline cursor-pointer">browse</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 rounded-full border">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-full bg-neutral-700 text-white">
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Preview */}
        <div className="bg-neutral-50 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Your Brand</h3>

          <div className="bg-neutral-200 rounded-xl p-6 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
              alt="preview"
              className="rounded-lg max-h-80"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-neutral-200 rounded-lg"
              />
            ))}
            <div className="w-20 h-20 border rounded-lg flex items-center justify-center text-xl">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Inputs */
const Input = ({ label }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      placeholder="Typing"
      className="mt-1 w-full px-4 py-2 rounded-full border outline-none text-sm"
    />
  </div>
);

const Select = ({ label }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select className="mt-1 w-full px-4 py-2 rounded-full border outline-none text-sm">
      <option>Typing</option>
      <option>Sans</option>
      <option>Serif</option>
    </select>
  </div>
  )



export default MyOrders
