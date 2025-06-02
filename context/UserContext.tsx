// useAuth.js (React custom hook)
import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ReactNode } from 'react';


type AuthContextType = {
    currentUser: User | null;
}
const AuthContext = createContext<AuthContextType>({
    currentUser: null,
});

type AuthProviderProps = {
    children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
