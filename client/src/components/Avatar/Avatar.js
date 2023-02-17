import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import "./Avatar.css";
const Avatar = ({ token }) => {
    const [profile, setProfile] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const imgPath = "http://localhost:9001/api/v1/img/";
    useEffect(() => {
        fetch(`${apiBaseUrl}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(({ status, result, error }) => {
                if (status === "ok") {
                    setProfile(result);
                    console.log("AVATAR-Fetch", result);
                } else {
                    setErrorMessage(error.message);
                }
            });
    }, [token]);

    if (profile.profilePicture === undefined) {
        return <p>Loading...</p>;
    }
    return (
        <Link to="/account">
            <img
                className="avatar-pic"
                src={`${imgPath}${profile.profilePicture}`}
                alt="😎"
            />
        </Link>
    );
};

export default Avatar;
