import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./LandingPage.css";

const LandingPage = () => {
	const navigate = useNavigate();

	function navigateLogin() {
		navigate("/login");
	}
	return (
		<div className="landing-page display-flex__centered direction-column">
			<div className="div-1 display-flex__centered direction-column">
				<img src="/images/landing-pic1.svg" />
				<h1>
					Track your Spend <br /> and income
				</h1>
				<h2>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Quas,
				</h2>
			</div>
			<div className="div-2 display-flex__centered direction-column">
				<img src="/images/landing-pic2.svg" />
				<h1>
					Analyze your
					<br /> spending
				</h1>
				<h2>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Quas,
				</h2>
			</div>
			<div className="button-wrapper">
				<Button buttonName={"Get started ➤"} function={navigateLogin} />
			</div>
		</div>
	);
};

export default LandingPage;