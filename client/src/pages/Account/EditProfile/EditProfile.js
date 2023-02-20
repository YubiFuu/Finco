import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./EditProfile.css";
import { makeFormData } from "./formData";
const EditProfile = ({ token }) => {
    const avatarPlaceholder = "/images/avatar-placeholder.svg";
    const [cardNumber, setCardNumber] = useState("");
    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [profilePicturePreview, setProfilePicturePreview] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/v1/users/profile`, {
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
                            `${apiBaseUrl}/api/v1/img/${result.profilePicture}`
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

        fetch(`${apiBaseUrl}/api/v1/users/profile`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })
            .then((res) => res.json())
            .then(({ status, result, error }) => {
                if (status === "ok") {
                    console.log(result);
                    return navigate("/home");
                } else {
                    console.log(error);
                    setErrorMessage("Error editing profile, try again later");
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Error editing profile, try again later");
            });
    };

    function backToDashboard() {
        navigate("/home");
    }

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
            <main>
                <h1>Edit your account</h1>
                <p>Profile picture</p>
                <img
                    id="edit-image"
                    src={`${profilePicturePreview || avatarPlaceholder}`}
                    alt="profile picture"
                />
                <input
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <input
                    type="text"
                    placeholder="Card number"
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                <div>
                    <input
                        type="text"
                        placeholder="Monthly Limit"
                        onChange={(e) =>
                            setMonthlyLimit(Number(e.target.value))
                        }
                    />
                </div>
                <Button
                    buttonName={"Save Changes"}
                    function={editProfile}
                ></Button>
                <Button
                    buttonName={"Cancel"}
                    function={backToDashboard}
                ></Button>
            </main>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default EditProfile;
