import mongoose from 'mongoose'

const connectDB=async ()=>{
        try {
                await mongoose.connect(`${process.env.MONGODB_URL}`);
                console.log("Db connected Successfully");
        } catch (error) {
                console.log("DataBase connection error",error);
        }
}
export default connectDB