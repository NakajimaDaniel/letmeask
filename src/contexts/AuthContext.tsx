import { createContext, useEffect, useState } from "react"

import {firebase, auth} from '../services/firebase'


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
    /*
    const provider = new firebase.auth.GoogleAuthProvider();

    const result =  await firebase.auth().signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error ('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL, 
        })
      }*/
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;

      // IdP data available in result.additionalUserInfo.profile.
        // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }


  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}