import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    else {
        return this.password = await bcrypt.hash(this.password, 10)
        next()

    }
})
userSchema.methods.passwordCheck = async function (password) {
    console.log(this.password);
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = function () {
    return Jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY
    })
}
export const User = mongoose.model('User', userSchema);


