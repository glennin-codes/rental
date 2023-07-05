import express from "express";
import { registerOwner } from "../Controllers/Auth/signup.js";
import { verifyCode } from "../Controllers/Auth/VerifyCode.js";
import { loginUser } from "../Controllers/Auth/login.js";
import { getAllUsers } from "../Controllers/User/getAllUsers.js";
import UpdateUser from "../Controllers/User/UpdateUser.js";
import getSingleUser from "../Controllers/User/getSingleUser.js";
import AuthenticateToken from "../Middleware/AuthMiddleware.js";
import deleteUser from "../Controllers/User/DeleteUser.js";
const router = express.Router(); 
router.get('/',(re,res)=>{
  res.send("api working succesful!")
})
router.post('/verifyCode',verifyCode);
router.post('/auth/signup',registerOwner)
router.post('/auth/login',loginUser);
router.route('/users/').get(getAllUsers);
router.route('/users/:id').put(AuthenticateToken,UpdateUser).get(getSingleUser).delete(AuthenticateToken,deleteUser);

export default router;
