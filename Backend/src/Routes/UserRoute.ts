import express from "express"
import { Login, Register } from "../Services/UserService";
import { UserModel } from "../Model/User";
const router=express.Router()

// router.post('/login',async(req,res)=>{
//     const {email,password}=req.body;
//     const {data,statusCode} = await Login({email,password});
//     res.status(statusCode).send(data)
// })

router.post('/signup',async(req,res)=>{
    const {fullName, phoneNumber, address, email, password, avatar} = req.body;
    const {data , statusCode}= await Register({fullName, phoneNumber, address, email, password, avatar});
    res.status(statusCode).send(data)
})

export default router