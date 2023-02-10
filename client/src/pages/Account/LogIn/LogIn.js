import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import "./LogIn.css";

const LogIn = () => {
	return (
		<div className="login-page">
			<h2>This is Login</h2>
			<p>Welcome back!</p>
			<div className="input-wrapper">
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<Link>Forgot password?</Link>
				<Button buttonName={"Login"}>Login</Button>
			</div>
			<p>
				Don't have any account? <Link>Sing up</Link>
			</p>
		</div>
	);
};

export default LogIn;
