import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./ForgotPassword.css";

const ForgotPassword = ({ token }) => {
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	function forgotPassword(event) {
		event.preventDefault();

		// prüfe ob required Eingaben getätigt wurden
		if (!email || email === "") {
			return <p>Check Email!</p>;
		}

		fetch(`${apiBaseUrl}/users/forgot-password`, {
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
				setErrorMessage("Success, check your e-mail");
			});
		// return navigate("/login");
	}

	return (
		<div>
			<h2>Enter your email</h2>
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button buttonName={"Get reset link"} function={forgotPassword} />
			<p>
				{`${errorMessage}`} <Link to="/register">register account</Link>
			</p>
		</div>
	);
};

export default ForgotPassword;
