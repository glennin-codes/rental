import express from "express";
import { registerOwner } from "../Controllers/Auth/signup.js";
import { verifyCode } from "../Controllers/Auth/VerifyCode.js";
import { loginUser } from "../Controllers/Auth/login.js";
import { getAllUsers } from "../Controllers/User/getAllUsers.js";
import UpdateUser from "../Controllers/User/UpdateUser.js";
import getSingleUser from "../Controllers/User/getSingleUser.js";
import AuthenticateToken from "../Middleware/AuthMiddleware.js";
import deleteUser from "../Controllers/User/DeleteUser.js";
import addProperties from "../Controllers/Properties/AddProperties.js";
import multer from "multer";
import { GetAllProperties } from "../Controllers/Properties/GetAllProperties.js";
import { GetSingleProperty } from "../Controllers/Properties/GetSingleProperty.js";
import { deleteProperty } from "../Controllers/Properties/deleteProperty.js";
import { UpdateProperty } from "../Controllers/Properties/UpdateProperty.js";
import { UpdatePwd, pwdResetEmails } from "../Controllers/Auth/ResetPwd/EmailReset.js";
const router = express.Router(); 
// const storage = multer.memoryStorage(); // Store files in memory as buffers
// const upload = multer({ storage: storage });
router.get('/',(req,res)=>{
  res.send("api working succesful!")
})
router.post('/verifyCode',verifyCode);
router.post('/auth/signup',registerOwner)
router.post('/auth/login',loginUser);
router.route('/users/').get(getAllUsers);
router.route('/reset-password/:token').post(UpdatePwd);
router.route('/pwd-reset-emails/').post(pwdResetEmails);
router.route('/users/:id').put(AuthenticateToken,UpdateUser).get(getSingleUser).delete(deleteUser);
router.route('/properties').post(addProperties).get(GetAllProperties);
router.route('/property/:id').get(GetSingleProperty).delete(deleteProperty).put(UpdateProperty);
export default router;
