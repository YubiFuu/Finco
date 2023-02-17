import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./ResetPassword.css";

const ResetPassword = ({ token }) => {
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	function resetPassword(event) {
		event.preventDefault();

		// prüfe ob required Eingaben getätigt wurden
		if (!password || password === "" || password !== repeatPassword) {
			setErrorMessage("check both passwords!");
			return;
		}

		fetch(`${apiBaseUrl}/users/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				password,
			}),
		})
			.then((res) => res.json())
			.then(({ status, error }) => {
				if (status === "error") {
					// error handling...
					setErrorMessage(error.message);
					return;
				}
			});
		return navigate("/");
	}

	return (
		<div>
			<h2>Enter new password</h2>
			<input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
				type="password"
				placeholder="repeat password"
				onChange={(e) => setRepeatPassword(e.target.value)}
			/>
			<Button buttonName={"Reset Password"} function={resetPassword} />
			<p>
				{`${errorMessage}`} <Link to="/register">register account</Link>
			</p>
		</div>
	);
};

export default ResetPassword;
