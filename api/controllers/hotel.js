import hotel from "../model/hotel.js";
import room from "../model/room.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err);
    }
}

export const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err);
    }
}

export const deleteHotel = async (req,res,next)=>{
    try{
        await hotel.findByIdAndDelete(
            req.params.id
            )
        res.status(200).json("Hotel has been deleted.");
    }catch(err){
        next(err);
    }
}


export const getHotel = async (req,res,next)=>{
    try{
        const hotelget = await hotel.findById(
            req.params.id
            )
        res.status(200).json(hotelget)
    }catch(err){
        next(err);
    }
}

export const getHotels = async (req,res,next)=>{
    const { min, max, ...others} = req.query;


    try{
        const hotels = await hotel.find({...others, cheapestPrice: {$gt:min | 1 , $lt:max || 999}, }).limit(req.query.limit);
        res.status(200).json(hotels)
    }catch(err){
        next(err);
    }
}


export const countByCity = async (req,res,next)=>{

const cities = req.query.cities.split(",")

    try{
        const list = await Promise.all(cities.map(city=>{
        return hotel.countDocuments({city:city})
        }))

        res.status(200).json(list);
    }catch(err){
        next(err);
    }
}

export const countByType = async (req,res,next)=>{


    
        try{

            const hotelCount = await hotel.countDocuments({type:"hotel"});
            const apartmentCount = await hotel.countDocuments({type:"apartment"});
            const resortCount = await hotel.countDocuments({type:"resort"});
            const villaCount = await hotel.countDocuments({type:"villa"});
            const cabinCount = await hotel.countDocuments({type:"cabin"});
    
            res.status(200).json([
                {type:"hotels", count: hotelCount},
                {type:"apartments", count: apartmentCount},
                {type:"resorts", count: resortCount},
                {type:"villas", count: villaCount},
                {type:"cabins", count: cabinCount},
            ]);
        }catch(err){
            next(err);
        }
    }


    export const getHotelRooms = async (req,res,next)=>{
        try{
            const gethrooms = await hotel.findById(req.params.id)
            const list = await Promise.all(gethrooms.rooms.map(rooms=>{
                    return room.findById(rooms)
                })
                )
                res.status(200).json(list)
           
        }catch(err){
            next(err);
        }
    };