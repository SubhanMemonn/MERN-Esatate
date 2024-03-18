import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const useCreateListing = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const createListing = async (formData) => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/listings/create", formData, { headers: { "Content-Type": "application/json" } })
            if (data.success === true) {
                toast.success(data.message)
                navigate(`/listing/${data.data._id}`)
            }
        } catch (error) {
            toast.error("Failed to upload")
        } finally {
            setLoading(false)

        }
    }
    return { loading, createListing }
}

export default useCreateListing