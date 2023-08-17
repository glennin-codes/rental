import  admin from "firebase-admin";

import { serviceAccount}  from "./service_config.js";

   export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}); 

