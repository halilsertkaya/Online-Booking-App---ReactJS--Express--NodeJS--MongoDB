import user from "../model/user.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next)=>{
try {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

const newUser = new user({
username:req.body.username,
password:hash,
email:req.body.email,
})


await newUser.save()
res.status(200).send("User has been created.")
}catch(err){
next(err)
}

}


export const login = async (req,res,next)=>{
    try {
    console.log(req.body.username+" - "+req.body.password)
    const usercheck = await user.findOne({ username:req.body.username })
    if(!usercheck) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, usercheck.password);
    if(!isPasswordCorrect) return next(createError(404, "Wrong password or username!"));
    
    const token = jwt.sign({ id:usercheck._id,adm:usercheck.adm }, process.env.JWT)

    const { password, adm, ...otherDetails } = usercheck._doc;
    res
    .cookie("access_token", token, {
        httpOnly: true,
    })
    .status(200)
    .json({details:{...otherDetails}, adm});
    }catch(err){
    next(err)
    }
    
    }