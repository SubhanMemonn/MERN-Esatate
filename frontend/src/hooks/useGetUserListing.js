import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
const useGetUserListing = () => {
    const { currentUser } = useSelector((store) => store.user)
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/users/listings/${currentUser?._id}`)
                if (data.success) {
                    setListings(data.data)
                }

            } catch (error) {
                console.log(error);
                toast.error("Failed to fetched")
            } finally {
                setLoading(false)
            }
        }
        if (currentUser) fetchData();
    }, [currentUser?._id])
    return { listings, loading, setListings }
}

export default useGetUserListing