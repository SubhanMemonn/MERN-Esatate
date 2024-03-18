import Router from 'express'
import {
    signUp,
    signIn,
    signOut,
    google,
    getUser,
    getUserListings,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js'
import JWTVerify from '../middlewares/auth.middleware.js'
const router = Router()

router.route("/:id")
    .get(JWTVerify, getUser)
    .patch(JWTVerify, updateUser)
    .delete(JWTVerify, deleteUser)

router.get("/listings/:id", JWTVerify, getUserListings)

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google", google)
router.post("/signout", JWTVerify, signOut)



export default router