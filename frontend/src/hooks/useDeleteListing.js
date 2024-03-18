import axios from 'axios'
import { useState } from "react"
import toast from 'react-hot-toast'

const useDeleteListing = () => {


    const [loading, setLoading] = useState(false)

    const deleteListing = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`/api/listings/${id}`)
            if (data.success === true) {
                toast.success(data.message)

            }
        } catch (error) {
            toast.error("Failed to delete listing")
        } finally {
            setLoading(false)
        }
    }
    return { loading, deleteListing }
}

export default useDeleteListing