

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getStorage} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDRQCm3TO8e7S7xH8r3xhq1z_LOqkacAow",
    authDomain: "proyectoweb-f2ea4.firebaseapp.com",
    projectId: "proyectoweb-f2ea4",
    storageBucket: "proyectoweb-f2ea4.appspot.com",
    messagingSenderId: "745659036453",
    appId: "1:745659036453:web:d1804e74075bb5a91520cc",
    measurementId: "G-XGCLYQPH24"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export {app}
  export const auth = getAuth(app);
  export const storage = getStorage(app)

