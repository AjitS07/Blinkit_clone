import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermision = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (isAdmin(user?.role)) {
    return children;
  }
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 text-center">
        
        <div className="mb-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
            <span className="text-red-600 text-xl font-bold">!</span>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          Access Denied
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          You do not have permission to access this page.
          Please contact the administrator.
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-6 px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminPermision;
