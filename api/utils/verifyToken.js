import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next)=> {

    const token = req.cookies.access_token;
    if(!token){ return next(createError(401, "You are not authenticated!")) }

    jwt.verify(token,process.env.JWT, (err, usercheck) =>{
    if(err) return next(createError(403, "Token is not valid!"))
    req.usero = usercheck;
    console.log(usercheck);
    console.log(req.usero.id+" ++- "+req.params.id+ " - "+req.usero.adm);
    next()
    })
    }


export const verifyUser = (req,res,next)=>{
        verifyToken(req,res,next, () => {

            
        if(req.usero.id === req.params.id || req.usero.adm){
        next()    
        }else{
        return next(createError(403, "You are not authorized!"))
        }
    });
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, next, () => {
        if(req.usero.adm){
        next()    
        }else{
         return next(createError(403, "You are not admin!"))
        }
    })
}