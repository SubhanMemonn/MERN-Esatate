import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const useUpdateListing = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const updateListing = async ({ formData, id }) => {
        console.log(formData);
        setLoading(true)

        try {
            const { data } = await axios.patch(`/api/listings/${id}`, formData, { headers: { "Content-Type": "application/json" } })
            console.log(data.data);
            if (data.success === true) {
                toast.success(data.message)
                navigate(`/listing/${data.data._id}`)
            }
        } catch (error) {
            toast.error("Failed to update")
        } finally {
            setLoading(false)

        }
    }
    return { loading, updateListing }
}

export default useUpdateListing