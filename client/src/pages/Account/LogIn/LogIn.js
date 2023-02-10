import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import "./LogIn.css";

const LogIn = ({ setToken }) => {
	const [email, setEmail] = useState("sersch@gmail.com");
	const [password, setPassword] = useState("12345678");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	function login(event) {
		event.preventDefault();

		fetch("http://localhost:9001/api/v1/users/login", {
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
		<div className="login-page">
			<h2>This is Login</h2>
			<p>Welcome back!</p>

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
				<Link>Forgot password?</Link>
				<Button buttonName={"Login"} function={login}>
					Login
				</Button>
				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}
			</form>

			<p>
				Don't have any account? <Link>Sing up</Link>
			</p>
		</div>
	);
};

export default LogIn;
