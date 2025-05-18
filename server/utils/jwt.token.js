import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
export const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, role : user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, role : user.role }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
}