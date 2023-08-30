import mongoose from 'mongoose';


const hotelSchema = new mongoose.Schema({
    name : {type: String, required:true},
    type : {type: String, required:true},
    city : {type: String, required:true},
    address : {type: String, required:true},
    distance : {type: String, required:true},
    pictures : {type: [String]},
    desc : {type: String, required:true},
    star : {type: Number, min:1, max:5, required:true},
    rating : {type: Number, min:0, max:5},
    rooms : {type: [String]},
    cheapestPrice : {type: Number, required:true},
    featured : {type: Boolean, default:false}
});

export default mongoose.model("hotel", hotelSchema)