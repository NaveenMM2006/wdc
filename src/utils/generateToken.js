import jwt from "jsonwebtoken";

export const generateToken = (faculty)=>{
    return jwt.sign(
        {
            id : faculty.id,
            role : faculty.role_name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};