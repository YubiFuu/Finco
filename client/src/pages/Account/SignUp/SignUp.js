import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import "./SignUp.css";

const SignUp = () => {
	return (
		<div>
			<h2></h2>
			<p></p>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<input type="checkbox" />
			<p>Agree to our Terms and Service</p>
			<Button />
			<p>
				Already have an account? <Link />
			</p>
		</div>
	);
};

export default SignUp;
