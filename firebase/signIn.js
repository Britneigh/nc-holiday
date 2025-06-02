import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js'

export const handleSignin = (email, password) => {

    return signInWithEmailAndPassword (auth, email, password)
    .then ((userCredential)=>{
        const user = userCredential.user;
        console.log(`User signed in:`, user);
    })
    .catch ((err)=>{
        console.log("Sign in error ",err.code, " ", err.message)
    })
}
