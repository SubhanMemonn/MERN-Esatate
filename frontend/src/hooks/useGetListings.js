import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const useGetListings = ({ searchTerm, parking, type, furnished, page = 1, limit, sort, offer }) => {
    let api = `/api/listings/get?page=${page}`
    if (searchTerm) api += `&searchTerm=${searchTerm}`;
    if (parking) api += `&parking=${parking}`;
    if (type === "rent" || type === "sale") api += `&type=${type}`;
    if (furnished) api += `&furnished=${furnished}`;
    if (limit) api += `&limit=${limit}`;
    if (sort) api += `&sort=${sort}`;
    if (offer) api += `&=offer${offer}`;

    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(api)
                if (data.success === true) {
                    if (page > 1) {
                        setListings([...listings, data.data])
                    } else {

                        setListings(data.data)
                    }
                    if (data.data > 8) {
                        setShowMore(true)
                    }
                }
            } catch (error) {
                toast.error("Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [searchTerm, parking, type, furnished, page, limit, sort, offer]) // Fix is here, remove the default value assignment for page

    return { loading, listings, showMore }
}

export default useGetListings
