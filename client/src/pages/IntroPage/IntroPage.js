import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

const IntroPage = ({ token }) => {
	const navigate = useNavigate();
	console.log("intro-page:", token);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!token) {
				navigate("/landing-page");
			} else {
				navigate("/login");
			}
		}, [6000]);
		return () => clearTimeout(timer);
	}, [navigate]);
	return (
		<div className="intro-page display-flex__centered direction-column">
			<img src="/images/Finco2.svg" />
			<h1>Finco Bank</h1>
			<h2>Ultra Premium Deluxe services!</h2>
		</div>
	);
};

export default IntroPage;