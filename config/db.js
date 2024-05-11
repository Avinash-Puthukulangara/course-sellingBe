import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_URL)

const connectDb = async () =>{
   try {
      await connect(process.env.DB_URL);
      console.log('DB connected Successfully')
   } catch (error) {
      console.log("error", error)
   }
};

export default connectDb;