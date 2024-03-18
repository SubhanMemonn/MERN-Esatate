import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { User } from '../models/user.model.js';
import generateToken from '../utils/generateToken.js'
import { COOKIE_OPTIONS } from '../constants.js'
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { Listing } from '../models/listing.model.js';

const signUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(new ApiError(400, "All field are required"))
    }
    const findUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (findUser) {
        throw new ApiError(400, "This username or email is already exists")
    }
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })
    if (!user) {
        throw new ApiError(500, "Something went wrong while signup user")

    }
    const token = await generateToken(user._id)
    const createdUser = await User.findById(user._id).select("-password")

    return res.status(201).cookie("token", token, COOKIE_OPTIONS).json(new ApiResponse(201, { user: createdUser, token }, "Sign up Successfully"))
})

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError(400, "All field are required"))
    }
    const findUser = await User.findOne({
        email
    })
    if (!findUser) {
        throw new ApiError(404, "User not found")
    }
    const isPassCorrect = await findUser.passwordCheck(password)
    if (!isPassCorrect) {
        throw new ApiError(401, "Wrong password")

    }

    const token = await generateToken(findUser._id)
    const signInUser = await User.findById(findUser._id).select("-password")

    return res.status(200).cookie("token", token, COOKIE_OPTIONS).json(new ApiResponse(201, { user: signInUser, token }, "Sign in Successfully"))
})

const signOut = asyncHandler(async (req, res) => {

    return res.status(200).clearCookie("token").json(new ApiResponse(201, {}, "Sign out Successfully"))
})

const google = asyncHandler(async (req, res) => {

    const { name, email, photo } = req.body;
    const findUser = await User.findOne({ email })

    if (findUser) {

        const token = await generateToken(findUser._id)
        const signInUser = await User.findById(findUser._id)

        return res.status(200).cookie("token", token, COOKIE_OPTIONS).json(new ApiResponse(200, { user: signInUser, token }, "Sign In Successfully"))
    } else {

        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

        const user = await User.create({
            username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            email,
            password: generatedPassword,
            avatar: photo
        })

        if (!user) {
            throw new ApiError(500, "Failed to Sign Up")
        }

        const token = generateToken(user._id)
        const createdUser = await User.findById(user._id).select("-password")

        return res.status(201).cookie("token", token, COOKIE_OPTIONS).json(new ApiResponse(201, { user: createdUser, token }, "Sign In Successfully"))
    }

})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return res.status(200).json(new ApiResponse(200, user, "User fetched"))
})

const getUserListings = asyncHandler(async (req, res) => {
    if (!req.user._id.equals(req.params.id)) {
        throw new ApiError(401, "You can only view your own listings!")
    }
    const listings = await Listing.find({ userRef: req.params.id })

    return res.status(200).json(new ApiResponse(200, listings, "All listings fetched"))
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { username, email, password, avatar, } = req.body;

    if (!req.user?._id.equals(id)) {
        throw new ApiError(401, "You can only update your own account!")
    }
    const user = await User.findById(id
    ).select("-password")
    if (avatar) {
        if (req.user?.avatar) {
            let delAvatar = user.avatar.split("/").pop().split(".")[0];
            await deleteOnCloudinary(delAvatar)

        }
        const uploadAvatar = await uploadOnCloudinary(avatar)
        if (!uploadAvatar) {
            throw new ApiError(500, "Failed to upload avatar")

        }
        user.avatar = uploadAvatar?.url
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (username) user.username = username;
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, user, "Update Successfully"))
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!req.user?._id.equals(id)) {
        throw new ApiError(401, "You can only delete your own account!")
    }
    const findUser = await User.findById(id)
    if (findUser.avatar) {
        let delAvatar = findUser.avatar.split("/").pop().split(".")[0];
        await deleteOnCloudinary(delAvatar)
    }
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        throw new ApiError(500, "Failed to delete")

    }
    return res.status(200).clearCookie("token").json(new ApiResponse(200, {}, "Delete successfully"))
})


export {
    signUp,
    signIn,
    signOut,
    google,
    getUser,
    getUserListings,
    updateUser,
    deleteUser
}