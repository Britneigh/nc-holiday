import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const handleSignup = (email: string, password: string)=>{

    return createUserWithEmailAndPassword (auth, email, password)
    .then ((userCredential)=>{
        const user = userCredential.user;
        console.log(`User signed up:`, user);
    })
    .catch ((err)=>{
        console.log("Error ",err.code, " ", err.message)
    })
}

