import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export const handleSignout = () => {

    return signOut(auth)
        .then(() => {
            console.log(`User signed out`);
        })
        .catch((err) => {
            console.log("Signing out error ", err.code, " ", err.message)
        })
}
