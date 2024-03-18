import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { signOutSuccess } from "../redux/user/userSlice"
const useSignOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const signOut = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/users/signout")
            if (data.success === true) {
                dispatch(signOutSuccess())
                toast.success(data.message)
                navigate("/sigIn")
            }
        } catch (error) {
            toast.error("Failed to sign out")
        } finally {
            setLoading(false)
        }
    }
    return { loading, signOut }
}

export default useSignOut