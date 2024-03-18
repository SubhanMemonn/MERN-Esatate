import { useState } from "react"
// import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { updateUserSuccess } from "../redux/user/userSlice"
const useUpdateUser = () => {
    const { currentUser } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const updateUser = async (formData) => {
        setLoading(true)
        try {
            const { data } = await axios.patch(`/api/users/${currentUser?._id}`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.success === true) {
                dispatch(updateUserSuccess(data.data))
                toast.success(data.message)

            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }
    return { loading, updateUser }
}

export default useUpdateUser