// Database + external services config
import mongoose from "mongoose"
const connectdb = async () => {
    try{
          const connectioninstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
          console.log(`\n Mongodb connetd ${connectioninstance.connection.host}`)
    }
    catch (error){
        console.log("mongo db connection error" , error);
        process.exit(1)
    }
}

export default connectdb