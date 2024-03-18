import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"

const useGetUser = (userId) => {
    const { currentUser } = useSelector((store) => store.user)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    useEffect(() => {
        const fetchedData = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/users/${userId}`)
                if (data.success === true) {
                    setUser(data.data)
                }
            } catch (error) {
                toast.error("Something went wrong")
            } finally {
                setLoading(false)

            }
        }
        if (currentUser) fetchedData();
    }, [userId])
    return { loading, user }
}

export default useGetUser