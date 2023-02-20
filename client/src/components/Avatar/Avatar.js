import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import "./Avatar.css";
const Avatar = ({ token }) => {
    const [profile, setProfile] = useState([]);
    const imgPath = `${apiBaseUrl}/api/v1/img/`;
    const avatarPlaceholder = "/images/avatar-placeholder.svg";
    useEffect(() => {
        fetch(`${apiBaseUrl}/api/v1/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(({ status, result }) => {
                if (status === "ok") {
                    setProfile(result);
                    console.log("AVATAR-Fetch", result);
                }
            });
    }, [token]);

    if (profile.profilePicture === undefined) {
        return (
            <Link to="/account">
                <img
                    className="avatar-pic box-shadow icon-color-account"
                    src={`${avatarPlaceholder}`}
                    alt="Avatar-pic"
                />
            </Link>
        );
    }
    return (
        <Link to="/account">
            <img
                className="avatar-pic box-shadow"
                src={`${imgPath}${profile.profilePicture}`}
                alt="Avatar-pic"
            />
        </Link>
    );
};

export default Avatar;
