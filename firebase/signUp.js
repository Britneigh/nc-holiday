import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js'

export const handleSignup = (email, password)=>{

    return createUserWithEmailAndPassword (auth, email, password)
    .then ((userCredential)=>{
        const user = userCredential.user;
        console.log(`User signed up:`, user);
    })
    .catch ((err)=>{
        console.log("Error ",err.code, " ", err.message)
    })
}

