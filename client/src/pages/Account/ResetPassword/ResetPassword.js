import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { resetPwdToken } = useParams();
    console.log(resetPwdToken);

    function resetPassword(event) {
        event.preventDefault();

        // prüfe ob required Eingaben getätigt wurden
        if (password !== repeatPassword) {
            setErrorMessage("Passwords must match");
            return;
        }

        fetch(`${apiBaseUrl}/users/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resetPwdToken}`,
            },
            body: JSON.stringify({
                password,
            }),
        })
            .then((res) => res.json())
            .then(({ status, error }) => {
                if (status === "error") {
                    // error handling...
                    setErrorMessage(
                        "To reset your password please use the link from your e-mail."
                    );
                    return;
                }
                setErrorMessage("Success! Please login now");
            });
        return navigate("/");
    }

    return (
        <div>
            <h2>Enter new password</h2>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="repeat password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button buttonName={"Reset Password"} function={resetPassword} />
            <p>
                {`${errorMessage}`} <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default ResetPassword;
