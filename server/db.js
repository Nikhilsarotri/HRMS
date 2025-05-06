import mongoose from "mongoose";
const connectDb= async ()=>{

try{
 await mongoose.connect('mongodb+srv://nikhilsarotri:4Z9zfrUZ3KN5JYs8@cluster0.pk6rezd.mongodb.net/hrms')
 console.log("databse connected sucessfully")



}
catch(err){
    console.log("Error connecting db",err)





}

}
export default connectDb;