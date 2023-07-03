import express from "express";
import { registerOwner } from "../Controllers/Auth/signup.js";
import { verifyCode } from "../Controllers/Auth/VerifyCode.js";
import { loginUser } from "../Controllers/Auth/login.js";
import { getAllUsers } from "../Controllers/User/getAllUsers.js";
const router = express.Router(); 
router.get('/',(re,res)=>{
  res.send("api working succesful!")
})
router.post('/verifyCode',verifyCode);
router.post('/auth/signup',registerOwner)
router.post('/auth/login',loginUser);
router.route('/users/').get(getAllUsers);

export default router;
