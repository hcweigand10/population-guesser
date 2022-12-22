import React, {useState} from 'react'
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
  googleLogout,
} from "@react-oauth/google";

const GoogleLoginBtn = () => {

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

    return (
        <div>
             <button onClick={() => login()}>Log in with Google</button>
        </div>
    )
}

export default GoogleLoginBtn