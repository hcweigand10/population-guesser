import React, { useContext } from "react";
import {
    GoogleOAuthProvider,
    GoogleLogin,
    // googleLogout,
} from "@react-oauth/google";
import userContext from "../../contexts/userContext";
import getGoogleInfo from "../../utils/googleAPI";

const GoogleAuth = () => {

    const { setUserInfo } = useContext(userContext)

    const responseGoogle = async (response: any) => {
        const token = response.credential
        const userInfoResponse = await getGoogleInfo(token)
        console.log(userInfoResponse)
        setUserInfo({email: userInfoResponse.data.email, name: userInfoResponse.data.name, pic: userInfoResponse.data.picture})
    };

    console.log(process.env.REACT_APP_CLIENT_ID)

    const error = () => {
        console.log("google error");
    };

    const yay = () => {
        console.log("yay");
    };

    return (
        <div className="card flex justify-content-center">
            <GoogleOAuthProvider
                clientId={process.env.REACT_APP_CLIENT_ID || ""}
                onScriptLoadError={error}
                onScriptLoadSuccess={yay}
            >
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={error}
                    useOneTap
                    auto_select
                ></GoogleLogin>
            </GoogleOAuthProvider>
        </div>
    );
};
export default GoogleAuth;
