import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./LandingPage.css";

const LandingPage = () => {
	const navigate = useNavigate();

	function navigateLogin() {
		navigate("/register");
	}
	return (
		<div className="landing-page display-flex__centered direction-column">
			<div className="landing-wrapper">
				<div className="div-1 display-flex__centered direction-column">
					<img src="/images/landing-pic1.svg" alt="landing logo 1" />
					<h1>
						Track your Spend and Income
						<br /> effortlessly
					</h1>
					<h2>Track your money flow at your fingertips</h2>
				</div>
				<div className="div-2 display-flex__centered direction-column">
					<img src="/images/landing-pic2.svg" alt="langing logo 2" />
					<h1>
						Analyze your
						<br /> spending
					</h1>
					<h2>Smart Banking for smart People</h2>
				</div>
			</div>
			<div className="button-wrapper">
				<Button buttonName={"Get started ➤"} function={navigateLogin} />
			</div>
			<footer>
				<p>
					Already have an account? <Link to="/login">Log in</Link>
				</p>
			</footer>
		</div>
	);
};

export default LandingPage;
