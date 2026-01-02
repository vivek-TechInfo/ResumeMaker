import mongoose from "mongoose";


const connectDB = async()=>{

    try{

        mongoose.connection.on("connected",()=>{
            console.log("Database connected successfully");
            
        })

        let mongodbURL =  process.env.MONGODB_URL
        const projectName = "resume-maker"


        if(!mongodbURL){
            throw new Error("MongoDB URL environment not set")
        }


        if(mongodbURL.endsWith("/")){
            mongodbURL = mongodbURL.slice(0,-1)

        }


        await mongoose.connect(`${mongodbURL}/${projectName}`)


    }catch(error){

        console.log("ERROR occured in mongodb : ",error);
        

    }
}


export default connectDB