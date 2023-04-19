import { useEffect, useState } from "react";
import { LOCAL_STORAGE } from "../utils/common";

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState();

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)
        if (token) {
            const username = localStorage.getItem(LOCAL_STORAGE.USERNAME)
            setUsername(username)
            setIsAuth(true)
        }
    }, []);
    return { isAuth, username }
};
