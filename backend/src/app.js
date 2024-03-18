import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import userRouter from './routes/user.routes.js'
import listingRouter from './routes/listing.routes.js'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/users", userRouter)
app.use("/api/listings", listingRouter)

export default app


