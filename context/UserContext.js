// useAuth.js (React custom hook)
import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
const AuthContext = createContext({
    currentUser: null,
});
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsub();
    }, []);
    return (<AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => useContext(AuthContext);
