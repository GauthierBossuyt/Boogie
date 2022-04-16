import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        axios
            .post("http://localhost:8000/login/spotify", {
                code,
                type: "Spotify",
            })
            .then((resp) => {
                window.history.pushState({}, null, "/");
                setAccessToken(resp.data.accessToken);
            })
            .catch(() => {
                window.location = "/";
            });
    }, [code]);

    return accessToken;
}
