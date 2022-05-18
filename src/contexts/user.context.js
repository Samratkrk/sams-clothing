import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//a Provider is an actual component
//For every context built, there is a ".Provier".
// ".Provider" will wrap around any component that needs value.

/* 
Obsereve <UserProvider> <App /> </UserProvider>
above the <App/> will become the UserProvider 's {children} 

We also need to pass the value={value} ,which will be an actual value of our createContext();
*/
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //generating the actual value to pass to the provider.
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
