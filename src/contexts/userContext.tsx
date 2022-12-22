import React from "react";
import {userContext} from "../interfaces/interfaces"

export default React.createContext<userContext>({
    userInfo: {
        email: null,
        name: null,
        pic: null
    },
    setUserInfo: () => {},
});
