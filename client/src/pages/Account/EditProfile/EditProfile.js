import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api";
import { makeFormData } from "./formData";
import "./EditProfile.css";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
const EditProfile = ({ token, isFromSignUp, setIsFromSignUp }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [profilePicturePreview, setProfilePicturePreview] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

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
                    if (result.profilePicture) {
                        setProfilePicturePreview(
                            `${apiBaseUrl}/img/${result.profilePicture}`
                        );
                    }
                } else {
                    setErrorMessage(error.message);
                }
            });
    }, []);

    useEffect(() => {
        if (!profilePicture) {
            return;
        }
        const reader = new FileReader();
        console.log(profilePicture);
        reader.readAsDataURL(profilePicture);
        reader.onloadend = function () {
            const base64data = reader.result;
            setProfilePicturePreview(base64data);
        };
    }, [profilePicture]);

    const editProfile = (event) => {
        event.preventDefault();
        const formData = makeFormData({
            cardNumber,
            monthlyLimit,
            profilePicture,
        });

        fetch(`${apiBaseUrl}/users/profile`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })
            .then((res) => res.json())
            .then(({ status, result, error }) => {
                if (status === "ok") {
                    console.log(result);
                } else {
                    console.log(error);
                    setErrorMessage("Error editing profile, try again later");
                }
                setIsFromSignUp(false);
                return navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Error editing profile, try again later");
            });
    };

    return (
        <div className="edit-profile">
            <header className="display-flex__between">
                <img
                    className="logo"
                    src="/images/Finco2.svg"
                    alt="finco-logo"
                />
                <div></div>
            </header>
            <h1>{isFromSignUp ? "Set up" : "Edit"} your account</h1>
            <p>Profile picture</p>
            <img src={profilePicturePreview} alt="profile-picture" />
            <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            <div>📸</div>
            <input
                type="text"
                placeholder="Card number"
                onChange={(e) => setCardNumber(e.target.value)}
            />
            <div>
                <div>⚠</div>
                <input
                    type="text"
                    placeholder="Monthly Limit"
                    onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                />
            </div>
            <Button buttonName={"Save Changes"} function={editProfile}></Button>
        </div>
    );
};

export default EditProfile;
