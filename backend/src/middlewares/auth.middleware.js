import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js"
import Jwt from "jsonwebtoken"
const JWTVerify = asyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiResponse(401, "Unathorized request")
        }
        // console.log(token);
        let decoded = Jwt.verify(token.toString(), process.env.TOKEN_SECRET)
        const user = await User.findById(decoded._id)
        if (!user) {
            throw new ApiError(403, "Invalid token")

        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid ID")
    }
})

export default JWTVerify