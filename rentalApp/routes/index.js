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
import { GetSingleProperty } from "../Controllers/Properties/GetSingleProperty.js";
import { deleteProperty } from "../Controllers/Properties/deleteProperty.js";
import { UpdateProperty } from "../Controllers/Properties/UpdateProperty.js";
import { UpdatePwd, pwdResetEmails } from "../Controllers/Auth/ResetPwd/EmailReset.js";
// import deleteAllExcept from "../insuators/delete.js";
import { GetAllProperties } from "../Controllers/Properties/GetAllProperties/index.js";
import { GetUserProperties } from "../Controllers/Properties/GetUserProperties.js";
import { requestVerification } from "../Controllers/Auth/requestVerification.js";
const router = express.Router(); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//  const upload = multer();
router.get('/',(req,res)=>{
  res.send("api working succesful!")
})
// router.delete('/properties/all/:id',deleteAllExcept);
router.post('/verifyCode',verifyCode);
router.post('/request/verifyCode',requestVerification);
router.post('/auth/signup',registerOwner)
router.post('/auth/login',loginUser);
router.route('/users/').get(getAllUsers);
router.route('/reset-password/:token').post(UpdatePwd);
router.route('/pwd-reset-emails/').post(pwdResetEmails);
router.route('/users/:id').patch(AuthenticateToken,UpdateUser).get(getSingleUser).delete(deleteUser);
router.route('/properties').post(upload.array('photos[]', 10),addProperties).get(GetAllProperties);
router.route('/user/properties/').get(GetUserProperties);
router.route('/property/:id').get(GetSingleProperty).delete(deleteProperty).put(UpdateProperty);
export default router;
