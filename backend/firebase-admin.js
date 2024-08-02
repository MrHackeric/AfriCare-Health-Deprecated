import admin from "firebase-admin";
import serviceAccount from "./config/africare-health-firebase-adminsdk.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth(); // Use this for server-side authentication operations

export { auth };
