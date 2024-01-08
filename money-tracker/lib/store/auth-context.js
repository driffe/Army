"use client"

import { createContext } from "react"
import { auth } from "../firebase"
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
export const authContext = createContext({
    user: null,
    loading: false,
    googleLoginHandler: async () => {},
    githubLoginHandler: async () => {},
    logout: async () => {}
})

export default function AuthContextProvider({children}) {
    const [user, loading] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider(auth);
    const githubProvider = new GithubAuthProvider(auth);

    const googleLoginHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            throw error;
        }
    };

    const githubLoginHandler = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        signOut(auth);
    };

    const values = {
        user,
        loading,
        googleLoginHandler,
        githubLoginHandler,
        logout
    }
    return <authContext.Provider value={values}>{children}</authContext.Provider>
}