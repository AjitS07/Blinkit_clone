import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserTie } from "react-icons/fa"
import { TbPhotoEdit, TbEdit } from "react-icons/tb"
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import UserDetailsEdit from '../components/UserDetailsEdit'

const Profile = () => {
    const user = useSelector(state => state.user)

    const [openAvatarEdit, setOpenAvatarEdit] = useState(false)
    const [openDetailsEdit, setOpenDetailsEdit] = useState(false)

    return (
        <div className="max-w-5xl mx-auto h-full p-4">

            {/* MAIN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start p-4">

                {/* ================= LEFT : AVATAR ================= */}
                <div className="flex flex-col items-center lg:items-start">

                    <div className="relative w-28 h-28 rounded-full overflow-hidden group shadow-md">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                                <FaUserTie size={48} />
                            </div>
                        )}

                        {/* Edit Avatar Overlay */}
                        <button
                            onClick={() => setOpenAvatarEdit(true)}
                            className="
              absolute bottom-0 left-0 w-full h-1/4
              bg-black/60 flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition
            "
                        >
                            <TbPhotoEdit className="text-white text-lg" />
                        </button>
                    </div>

                    <p className="mt-3 text-sm text-neutral-600">
                        Click image to update avatar
                    </p>
                </div>

                {/* ================= RIGHT : DETAILS ================= */}
                <div className="bg-white p-6 rounded-xl shadow-md">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Profile Details</h3>

                        <button
                            onClick={() => setOpenDetailsEdit(true)}
                            className="flex items-center gap-1 text-teal-600 hover:text-teal-700"
                        >
                            <TbEdit /> Edit
                        </button>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm text-neutral-700">
                        <p>
                            <span className="font-medium">Name:</span> {user.name}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span> {user.email}
                        </p>
                        <p>
                            <span className="font-medium">Mobile:</span> {user.mobile}
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= MODALS ================= */}
            {openAvatarEdit && (
                <UserProfileAvatarEdit close={() => setOpenAvatarEdit(false)} />
            )}

            {openDetailsEdit && (
                <UserDetailsEdit close={() => setOpenDetailsEdit(false)} />
            )}

        </div>
    )

}

export default Profile
