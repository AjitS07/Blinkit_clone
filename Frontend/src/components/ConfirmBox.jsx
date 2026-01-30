import React from "react"
import { IoClose } from "react-icons/io5"

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-neutral-800">
            Permanent Delete
          </h2>
          <button
            onClick={close}
            className="text-neutral-500 hover:text-red-500 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 text-sm text-neutral-600">
          <p>
            Are you sure you want to permanently delete this item?
            This action <span className="font-medium text-red-500">cannot be undone</span>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t">
          <button
            onClick={cancel}
            className="flex-1 py-2 rounded-lg border border-neutral-300 text-neutral-700
            hover:bg-neutral-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={confirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold
            hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmBox
