import * as React from "react";
import {firebaseAuthContext, auth} from "./firebase";


const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const value = { user };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <firebaseAuthContext.Provider value={value}>
      {children}
    </firebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(firebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  // console.log('context.user = ', context.user)
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };