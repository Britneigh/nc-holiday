import { createContext } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
}
export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false
});


