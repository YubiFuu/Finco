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

		fetch(`${apiBaseUrl}/api/v1/users/reset-password`, {
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
		return navigate("/home");
	}

	return (
		<div className="reset-password">
			<header className="display-flex__between">
				<img
					className="logo"
					src="/images/Finco2.svg"
					alt="finco-logo"
				/>
				<div></div>
			</header>
			<main>
				<h1>Enter new password</h1>
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
				<Button
					buttonName={"Reset Password"}
					function={resetPassword}
				/>
			</main>
			<footer>
				<p>
					Back to <Link to="/login">Login</Link>
				</p>
				<p className="error-message">{`${errorMessage}`}</p>
			</footer>
		</div>
	);
};

export default ResetPassword;
