import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { signUpSuccess } from "../redux/user/userSlice"
const useSignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const signUp = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/users/signup", { username: username.replace(/[^a-zA-z0-9]/g, "").trim(), email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.success === true) {
                dispatch(signUpSuccess(data.data.user))
                toast.success(data.message)
                navigate("/")
            }
        } catch (error) {
            toast.error("Failed to sign up")
        } finally {
            setLoading(false)
        }
    }
    return { loading, signUp }
}

export default useSignUp