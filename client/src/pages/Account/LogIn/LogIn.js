import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./LogIn.css";

const LogIn = ({ setToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	function login(event) {
		event.preventDefault();

		fetch(`${apiBaseUrl}/api/v1/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
			credentials: "include", // muss sein für refresh token! -- "save httpOnly cookie session"
		})
			.then((res) => res.json())
			.then(({ status, result, error }) => {
				if (status === "error") {
					// error handling...
					setErrorMessage(error.message);
					return;
				}
				// result: { acccessToken, refreshToken }
				setToken(result.accessToken);
				return navigate("/home");
			});
	}

	return (
		<div className="login-page body-column">
			<header className="display-flex__between">
				<img
					className="logo"
					src="/images/Finco2.svg"
					alt="finco-logo"
				/>
				<div></div>
			</header>
			<main>
				<div className="div-centered">
					<h1>Welcome back!</h1>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Cupiditate, ad!
					</p>
				</div>
				<form className="input-wrapper">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Link to="/forgot-password" className="forgot-password">
						Forgot password?
					</Link>
					<Button buttonName={"Login"} function={login}>
						Login
					</Button>
					{errorMessage && (
						<p className="error-message">{errorMessage}</p>
					)}
				</form>
			</main>
			<footer>
				<p>
					Don't have any account? <Link to="/register">Sign up</Link>
				</p>
			</footer>
		</div>
	);
};

export default LogIn;
