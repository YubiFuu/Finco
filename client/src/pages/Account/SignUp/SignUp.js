import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import "./SignUp.css";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [termsAndService, setTermsAndService] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessage2, setErrorMessage2] = useState("");

	const navigate = useNavigate();
	function register(event) {
		event.preventDefault(); // page reload verhindern!
		if (!termsAndService) {
			setErrorMessage2("Check all required fields!");
			return;
		}
		setErrorMessage2("");

		fetch(`${apiBaseUrl}/api/v1/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then(({ status, error }) => {
				if (status === "error") {
					setErrorMessage(error.message);
					return;
				}

				return navigate("/login");
			});
	}

	return (
		<div className="sign-up body-column">
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
					<h1>Create an account</h1>

					{errorMessage ? (
						<p className="error-message">{errorMessage}</p>
					) : (
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ex debitis sit esse sint deleniti.
						</p>
					)}
				</div>
				<h3 className="error-message">{errorMessage2}</h3>

				<form className="input-wrapper">
					<input
						type="text"
						placeholder="Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
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
					<div className="checkbox-wrapper">
						<input
							className={`${termsAndService ? "" : "required"}`}
							type="checkbox"
							required
							onClick={() => setTermsAndService(!termsAndService)}
						/>
						<p>
							Agree to our <b>Terms and Service</b>
						</p>
					</div>
					<Button buttonName={"Register Now"} function={register} />
				</form>
			</main>
			<footer>
				<p>
					Already have an account? <Link to="/login">Log in</Link>
				</p>
			</footer>
		</div>
	);
};

export default SignUp;
