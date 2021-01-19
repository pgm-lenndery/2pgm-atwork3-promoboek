import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { auth, firestore } from "./firebase";
import { useFirestoreCrud } from "./useFirestoreCrud.js";

const reducer = (state, action) => {
    switch (action.type) {
        case "idle":
            return { status: "idle", data: undefined, error: undefined };
        case "loading":
            return { status: "loading", data: undefined, error: undefined };
        case "success":
            return { status: "success", data: action.payload, error: undefined };
        case "error":
            return { status: "error", data: undefined, error: action.payload };
        default:
            throw new Error("invalid action");
    }
}

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ noUserFound, setNoUserFound ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { setDocumentByID, state: { status: registeredUserStatus } } = useFirestoreCrud();
    
    const initialState = { 
        status: "idle",
        data: undefined, 
        error: undefined 
    }
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    /**
     * Save a user in the storage
     * @param {string} email 
     * @param {string} password 
     */
    const login = (email, password) => {
        dispatch({ type: "loading" });
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => dispatch({ type: "success", payload: null }))
        .catch(err => {
            dispatch({ type: "error", payload: err })
        })
    }
    
    /**
     * Create a new user
     * @param {string} email 
     * @param {string} password 
     * @param {string} otherData 
     */
    const register = async (email, password, otherData) => {
        dispatch({ type: "loading" });
        try {
            const newUser = await auth.createUserWithEmailAndPassword(email, password)
            const uid = newUser.user.uid;
            setDocumentByID({
                ...otherData,
                createdAt: new Date()
            }, `users/${uid}`)
        } catch (err) {
            dispatch({ type: "error", payload: err })
        }
    }
            
    useEffect(() => {
        if (registeredUserStatus === 'success') dispatch({ type: "success", payload: null })
    }, [registeredUserStatus])
        
    /**
     * Remove the saved user from the storage
     */

    const logout = () => {
        auth.signOut();
        // updateDocument({
        //     activity: 'logged_out',
        //     last_activity: new Date()
        // });
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async registeredUser => {
            if (registeredUser) {
                setNoUserFound(false)
                
                // find user based on registed user id
                firestore.doc(`users/${registeredUser.uid}`).onSnapshot(snapshot => {
                    setUser({ 
                        ...registeredUser,
                        ...(snapshot.data() || {} ),
                    });
                });
                setLoading(false)
            }
            else {
                setUser({})
                setNoUserFound(true)
            }
        })
        return () => unsubscribe();
    }, [])
    
    const value = {
        state,
        user,
        noUserFound,
        login,
        register,
        logout,
        loading
    }
    
    return (
        <AuthContext.Provider value={ value }>
            {/* { !loading && children } */}
            { children }
        </AuthContext.Provider>
    )
}