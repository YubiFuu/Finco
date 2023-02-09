import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";

const LogIn = () => {
	return (
		<div>
			<h2></h2>
			<p></p>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<Link>Forgot password?</Link>
			<Button>Login</Button>
			<p>
				Don't have any account? <Link>Sing up</Link>
			</p>
		</div>
	);
};

export default LogIn;
