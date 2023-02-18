import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./ForgotPassword.css";

const ForgotPassword = ({ token }) => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    function forgotPassword(event) {
        event.preventDefault();

        // prüfe ob required Eingaben getätigt wurden
        if (!email || email === "") {
            return <p>Check Email!</p>;
        }

        fetch(`${apiBaseUrl}/api/v1/users/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then(({ status, error }) => {
                if (status === "error") {
                    // error handling...
                    setErrorMessage(error.message);
                    return;
                }
                setSuccessMessage("Success! Check your e-mails.");
            });
        // return navigate("/login");
    }

    return (
        <div className="forgot-pass">
            <header className="display-flex__between">
                <img
                    className="logo"
                    src="/images/Finco2.svg"
                    alt="finco-logo"
                />
                <div></div>
            </header>
            <main>
                <h1>Enter your email</h1>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    buttonName={"Get reset link"}
                    function={forgotPassword}
                />

                <p className="error-message">{`${errorMessage}`}</p>
                <p className="success-message">{`${successMessage}`}</p>
            </main>
            <footer>
                {" "}
                <p>
                    You remember your password? <Link to="/login">Log in</Link>
                </p>
                <p>
                    Don't Have an account? <Link to="/register">Sign in</Link>
                </p>
            </footer>
        </div>
    );
};

export default ForgotPassword;
