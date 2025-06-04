import {handleSignin} from './firebase/signIn.js'
import {auth} from './home/britney/northcoders/projects/nc-holiday/firebaseConfig.js'

handleSignin('garymorris1968@gmail.com', 'password')
.then(()=>{
console.log("User ", auth.currentUser)
})