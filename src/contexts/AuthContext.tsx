import { createContext, useEffect, useState } from "react"

import { firebase } from '../services/firebase'

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (user) {
   
      const { displayName, photoURL, uid } = user
  
      if (!displayName || !photoURL) {
        throw new Error ('Missing information from Google Account.');
      }
  
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL, 
      })
    }
    })

    return () => {
      unsubscribe();
    }

  }, []) 

   async function signInWithGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}