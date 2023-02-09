import Button from "../../../components/Button/Button";
import "./ForgotPassword.css";

const ForgotPassword = () => {
	return (
		<div>
			<h2>Enter your email</h2>
			<input type="email" placeholder="Email" />
			<Button>Get reset link</Button>
		</div>
	);
};

export default ForgotPassword;
