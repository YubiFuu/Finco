import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./SignUp.css";

const SignUp = ({ setIsFromSignUp }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [profilePicture, setProfilePicture] = useState(null);
    // const [bio, setBio] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    // const apiBaseUrl = "http://localhost:9001/api/v1";
    function register(event) {
        event.preventDefault(); // page reload verhindern!

        fetch(`${apiBaseUrl}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                // FIXME: use multipart/form-data and upload the file as blob!!!
                // profilePicture,
                // bio,
            }),
        })
            .then((res) => res.json())
            .then(({ status, error }) => {
                if (status === "error") {
                    // error handling...
                    setErrorMessage(error.message);
                    return;
                }
                setIsFromSignUp(true);
                return navigate("/edit-profile");
            });
    }

    return (
        <div className="sign-up">
            <h2>Create an account</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                debitis sit esse sint deleniti.
            </p>

            <form className="input-wrapper">
                <input
                    className="input-form"
                    type="text"
                    placeholder="Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    className="input-form"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    className="input-form"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="input-form"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button buttonName={"Register Now"} function={register} />
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>

            <div className="checkbox-wrapper">
                <input type="checkbox" />
                <p>Agree to our Terms and Service</p>
            </div>

            <p>
                Already have an account? <Link />
            </p>
        </div>
    );
};

export default SignUp;
