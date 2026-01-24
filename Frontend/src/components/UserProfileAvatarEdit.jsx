import React, { useState, useCallback } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import Cropper from 'react-easy-crop'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userSlice'
import { getCroppedImg } from '../utils/cropImage'

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [step, setStep] = useState(1) // 1 choose | 2 crop | 3 upload
  const [imageSrc, setImageSrc] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropPixels, setCropPixels] = useState(null)
  const [loading, setLoading] = useState(false)

  // ------------------ SELECT IMAGE ------------------
  const onSelectImage = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result)
      setStep(2)
    }
    reader.readAsDataURL(file)
  }

  // ------------------ CROP COMPLETE ------------------
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCropPixels(croppedAreaPixels)
  }, [])

  // ------------------ SAVE CROP ------------------
  const handleSaveCrop = async () => {
    const cropped = await getCroppedImg(imageSrc, cropPixels)
    setCroppedImage(cropped)
    setStep(3)
  }

  // ------------------ UPLOAD (YOUR SAME LOGIC) ------------------
  const handleUploadAvatar = async () => {
    try {
      setLoading(true)

      const blob = await fetch(croppedImage).then(r => r.blob())
      const formData = new FormData()
      formData.append('avatar', blob)

      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData
      })

      dispatch(updatedAvatar(response.data.data.avatar))
      close()

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white w-full max-w-sm rounded-lg p-2 relative shadow-xl'>



        {/* Title */}
        <h2 className='text-center text-lg font-semibold mb-5'>
          Edit Profile Photo
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className='w-24 h-24 mx-auto rounded-full overflow-hidden border bg-neutral-100 flex items-center justify-center'>
              {
                user.avatar ? (
                  <img
                    src={user.avatar}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <FaRegUserCircle size={72} className='text-neutral-400' />
                )
              }
            </div>

            <p className='text-xs text-neutral-500 text-center mt-2'>
              Choose a clear square photo
            </p>

            {/* Buttons */}
            <div className='flex gap-2 mt-4 p-4  justify-center items-center w-full'>
              <label className=' flex-1 cursor-pointer '>
                <div className='bg-teal-400 hover:bg-teal-500 transition rounded-full py-1.5 px-2  text-center text-white text-sm font-medium'>
                  Choose Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onSelectImage}
                />
              </label>

              <button
                onClick={close}
                className='flex-1 border rounded-full py-1.5 px-2  text-sm bg-white hover:bg-red-200'>
                Close
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className='relative w-full h-64 rounded-xl overflow-hidden bg-black'>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom Slider (sirf UI, zoom state already hai) */}
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className='w-full mt-3'
            />

            <div className='flex gap-2 mt-4'>
              <button
                onClick={handleSaveCrop}
                className='flex-1 bg-teal-600 hover:bg-teal-700 transition rounded-full py-1 text-sm  text-white font-sm'>
                Save Crop
              </button>

              <button
                onClick={close}
                className='flex-1 border rounded-full py-2 text-sm bg-white hover:bg-red-200'>
                Close
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className='w-32 h-32 mx-auto rounded-full overflow-hidden border'>
              <img
                src={croppedImage}
                className='w-full h-full object-cover'
              />
            </div>

            <p className='text-xs text-neutral-500 text-center mt-2'>
              Looks good? Upload your avatar
            </p>

            <div className='flex gap-2 mt-4 p-4'>
              <button
                onClick={handleUploadAvatar}
                disabled={loading}
                className='flex-1 bg-teal-500 text-white hover:bg-teal-600 transition rounded-full px-2 py-1.5 text-sm font-medium'>
                {loading ? "Uploading..." : "Upload"}
              </button>

              <button
                onClick={close}
                className='flex-1 border rounded-full py-1.5 px-2 text-sm bg-white hover:bg-red-200'>
                Close
              </button>
            </div>
          </>
        )}

      </div>
    </section>
  )


}

export default UserProfileAvatarEdit
