import { Link } from "react-router-dom";
import "./ButtonBack.css";

const ButtonBack = () => {
	return (
		<Link to="/home">
			<img
				className="back-button"
				src="/images/arrow-back-icon.svg"
				alt="BACK"
			/>
		</Link>
	);
};

export default ButtonBack;
