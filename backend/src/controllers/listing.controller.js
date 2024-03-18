import { Listing } from '../models/listing.model.js';
import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const create = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        address,
        regularPrice,
        discountPrice,
        bathrooms,
        bedrooms,
        furnished,
        parking,
        type,
        offer,
        imageUrls,
        userRef
    } = req.body;

    const imgArr = await uploadOnCloudinary(imageUrls)
    if (!imgArr) {
        throw new ApiError(400, "Error while uploading image")

    }

    const listing = await Listing.create({
        name,
        description,
        address,
        regularPrice,
        discountPrice,
        bathrooms,
        bedrooms,
        furnished,
        parking,
        type,
        offer,
        imageUrls: imgArr,
        userRef
    })

    if (!listing) {
        throw new ApiError(500, "Failed to upload")
    }

    return res.status(200).json(new ApiResponse(200, listing, "upload successfully"))
})

const getListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
        throw new ApiError(404, "Listhing not found")
    }
    return res.status(200).json(new ApiResponse(200, listing, "Listhing fetched"))
})

const deleteListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
        throw new ApiError(404, "Listing not found")
    }
    if (listing.imageUrls) {
        await deleteOnCloudinary(listing.imageUrls)
    }

    if (!listing.userRef.equals(req.user?._id)) {
        throw new ApiError(401, "You can only delete your own listings!")

    }
    await Listing.findByIdAndDelete(listing?._id)
    return res.status(200).json(new ApiResponse(200, {}, 'Listing has been deleted!'));
})

const updateListing = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        address,
        regularPrice,
        discountPrice,
        bathrooms,
        bedrooms,
        furnished,
        parking,
        type,
        offer,
        imageUrls,
        userRef
    } = req.body;

    const findListing = await Listing.findById(req.params.id)

    if (!findListing) {
        throw new ApiError(404, "Listing not found")
    }
    if (!findListing.userRef.equals(req.user?._id)) {
        throw new ApiError(401, "You can only update your own listings!")

    }


    // await deleteOnCloudinary(findListing.imageUrls)
    let imgArr = await uploadOnCloudinary(imageUrls)
    // if (!imgArr) {
    //     throw new ApiError(400, "Error while uploading image")

    // }
    const updatedListing = await Listing.findByIdAndUpdate(findListing._id, {
        $set: {
            name,
            description,
            address,
            regularPrice,
            discountPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls: imgArr,
            userRef
        }
    }, { new: true })

    return res.status(200).json(new ApiResponse(200, updatedListing, "Update Successfully"))
})
const getListings = asyncHandler(async (req, res) => {
    const { searchTerm, parking, type, furnished, offer } = req.query;
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 8;
    const skip = limit * (page - 1)
    const sort = req.query.sort === "asc" ? 1 : -1;
    let baseQuery = {}
    if (searchTerm) {
        baseQuery.name = {
            $regex: searchTerm,
            $options: "i"
        }
    }
    if (parking) baseQuery.parking = parking;
    if (type) baseQuery.type = type;
    if (furnished) baseQuery.furnished = furnished;
    if (offer) baseQuery.offer = offer;

    const listings = await Listing.find(baseQuery).sort({ createdAt: sort }).limit(limit).skip(skip)

    return res.status(200).json(new ApiResponse(200, listings, "All listings fetched"))
})
export {
    create,
    getListing,
    deleteListing,
    updateListing,
    getListings
}