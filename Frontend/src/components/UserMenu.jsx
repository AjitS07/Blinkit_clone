import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import { FiLogOut, FiMapPin, FiShoppingBag } from "react-icons/fi";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UserMenu = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if (response.data.success) {
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)

            }

        } catch (error) {
            AxiosToastError(errror)
        }

    }

    return (
        <div className="w-56 text-gray-800">
            {/* User Info */}
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold uppercase">
                    {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                    <p className="text-sm font-semibold leading-none">
                        {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {user?.email || user?.mobile}
                    </p>
                </div>
            </div>

            <Divider />

            {/* Menu Links */}
            <div className="flex flex-col text-sm">
                <Link
                    to="/orders"
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 hover:text-teal-600 transition"
                >
                    <FiShoppingBag size={16} />
                    My Orders
                </Link>

                <Link
                    to="/address"
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 hover:text-teal-600 transition"
                >
                    <FiMapPin size={16} />
                    Saved Address
                </Link>

                <button onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-2 rounded text-left hover:bg-red-50 hover:text-red-600 transition"
                >
                    <FiLogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
