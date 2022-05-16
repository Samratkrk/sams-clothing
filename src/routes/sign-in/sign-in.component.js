import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  //Experimenting with googleRedirect
  // useEffect(() => {
  //   (async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   })();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button> */}
    </div>
  );
};

export default SignIn;
