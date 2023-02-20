import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Avatar from "../../../components/Avatar/Avatar";
import NavBar from "../../../components/NavBar/NavBar";
import "./AccountPage.css";

const AccountPage = ({ token, setToken }) => {
    const [profile, setProfile] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);
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
                    setProfile(result);
                } else {
                    setErrorMessage(error.message);
                }
            });
    }, [token]);

    function logout(event) {
        event.preventDefault();

        fetch(`${apiBaseUrl}/api/v1/users/logout`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => res.json())
            .then(() => {
                setToken(null);
                navigate("/login"); // LogoutPage will delete Token and navigate to /login
            });
    }

    return (
        <div className="account-page">
            <div className="display-flex__between header">
                <div>
                    <p>Welcome back,</p>
                    <h2>
                        {`${profile.firstName} 
						${profile.lastName}`}
                    </h2>
                </div>
                <Avatar token={token} />
            </div>
            <Link to="/home">
                <div className="outer-wrapper__small">
                    <div className="wrapper-left">
                        <img
                            className="icon-color-account"
                            src="/images/my-wallet-icon.svg"
                            alt="wallet-icon"
                        />
                        <h2>My wallet</h2>
                    </div>
                    <img
                        className="icon-color-account back-button"
                        src="/images/arrow-forward-icon.svg"
                        alt="arrow-forward"
                    />
                </div>
            </Link>
            <div className="middle-section-wrapper">
                <div className="outer-wrapper__small-2 corner-top__rounded">
                    <div className="wrapper-left">
                        <img
                            className="icon-color-account"
                            src="/images/notifications-icon.svg"
                            alt="wallet-icon"
                        />
                        <h2>Notification</h2>
                    </div>
                    <img
                        className="icon-color-account back-button"
                        src="/images/arrow-forward-icon.svg"
                        alt="arrow-forward"
                    />
                </div>
                <Link to="/edit-profile">
                    <div className="outer-wrapper__small-2 settings">
                        <div className="wrapper-left">
                            <img
                                className="icon-color-account"
                                src="/images/settings-icon.svg"
                                alt="wallet-icon"
                            />
                            <h2>Settings</h2>
                        </div>
                        <img
                            className="icon-color-account back-button"
                            src="/images/arrow-forward-icon.svg"
                            alt="arrow-forward"
                        />
                    </div>
                </Link>
                <div className="outer-wrapper__small-2 corner-bottom__rounded">
                    <div className="wrapper-left">
                        <img
                            className="icon-color-account"
                            src="/images/FAQ-icon.svg"
                            alt="wallet-icon"
                        />
                        <h2>FAQ</h2>
                    </div>
                    <img
                        className="icon-color-account back-button"
                        src="/images/arrow-forward-icon.svg"
                        alt="arrow-forward"
                    />
                </div>
            </div>

            <div className="outer-wrapper__small" onClick={logout}>
                <div className="wrapper-left">
                    <img
                        className="icon-color-account"
                        src="/images/logout-icon.svg"
                        alt="wallet-icon"
                    />
                    <h2>Logout</h2>
                </div>
                <img
                    className="icon-color-account back-button"
                    src="/images/arrow-forward-icon.svg"
                    alt="arrow-forward"
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <NavBar />
        </div>
    );
};

export default AccountPage;
