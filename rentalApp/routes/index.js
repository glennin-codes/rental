import express from "express";
import { registerOwner } from "../Controllers/Auth/index.js";
import { verifyCode } from "../Controllers/Auth/VerifyCode.js";
const router = express.Router(); 
router.get('/',(re,res)=>{
  res.send("api working succesful!")
})
router.post('/verifyCode',verifyCode);
router.route('/owners/').post(registerOwner);

export default router;
