import React, { useContext } from "react";
import {
    GoogleOAuthProvider,
    GoogleLogin,
    useGoogleLogin,
    googleLogout,
} from "@react-oauth/google";
import userContext from "../../contexts/userContext";
import getGoogleInfo from "../../utils/googleAPI";

const GoogleAuth = () => {

    const { setUserInfo } = useContext(userContext)

    const responseGoogle = async (response: any) => {
        const token = response.credential
        const userInfoResponse = await getGoogleInfo(token)
        setUserInfo({email: userInfoResponse.data.email, name: userInfoResponse.data.name, pic: userInfoResponse.data.picture})
    };

    const error = () => {
        console.log("google error");
    };

    const success = () => {
        console.log("script load success");
    };

   

    return (
        <div className="card flex justify-content-center">
            <GoogleOAuthProvider
                clientId={process.env.REACT_APP_CLIENT_ID || ""}
                onScriptLoadError={error}
                onScriptLoadSuccess={success}
            >
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={error}
                    useOneTap
                    auto_select
                ></GoogleLogin>
                {/* <GoogleLoginBtn/> */}
            </GoogleOAuthProvider>
        </div>
    );
};
export default GoogleAuth;
