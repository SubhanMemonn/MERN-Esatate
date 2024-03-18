import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { deleteUserSuccess } from "../redux/user/userSlice"
const useDeleteUser = () => {
    const { currentUser } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const deleteUser = async () => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`/api/users/${currentUser?._id}`)
            if (data.success === true) {
                dispatch(deleteUserSuccess())
                toast.success(data.message)
                navigate("/signIn")
            }
        } catch (error) {
            toast.error("Failed to delete user")
        } finally {
            setLoading(false)
        }
    }
    return { loading, deleteUser }
}

export default useDeleteUser