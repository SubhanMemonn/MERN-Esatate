import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useGetListing = (id) => {
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState([])
    useEffect(() => {
        const fetchedData = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/listings/${id}`)
                if (data.success === true) {
                    setListing(data.data)
                }
            } catch (error) {
                toast.error("Failed to fetch")
            } finally {
                setLoading(false)

            }
        }
        fetchedData()
    }, [id])
    return { loading, listing }
}

export default useGetListing