import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const handleSignin = (email: string, password: string) => {

    return signInWithEmailAndPassword (auth, email, password)
    .then ((userCredential) => {
        const user = userCredential.user;
        console.log(`User signed in:`, user);
        return user
    })
    .catch ((err)=>{
        console.error("Sign in error ",err.code, err.message);
        throw err;
    })
}
