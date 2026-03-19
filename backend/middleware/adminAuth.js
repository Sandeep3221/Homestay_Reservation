import jwt from 'jsonwebtoken'

export const adminAuth=async(req,res,next)=>{
        try {
                const token=req.headers.token
                if(!token){
                        return res.json({success:false,message:"Unauthorized user"})
                }
                const token_decode=jwt.verify(token, process.env.JWT_SECRET);
                if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.role !== 'admin') {
                        return res.json({success:false, message:"User not authorized"})
                }
                next()
        } catch (error) {
                return res.json({success:false,message:"Authentication not successful",error})
        }
}