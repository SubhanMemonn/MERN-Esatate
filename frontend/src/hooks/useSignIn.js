import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"
const useSignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const signIn = async ({ email, password }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/users/signin", { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.success === true) {
                dispatch(signInSuccess(data.data.user))
                toast.success(data.message)
                navigate("/")
            }
        } catch (error) {
            if (error.response.status === 404) toast.error("This email is not existed");
            if (error.response.status === 401) toast.error("Password is wrong");
            else {
                toast.error("Failed to signIn")
            }
        } finally {
            setLoading(false)
        }
    }
    return { loading, signIn }
}

export default useSignIn