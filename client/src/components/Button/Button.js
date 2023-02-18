import "./Button.css";

const Button = (props) => {
	return (
		<button onClick={props.function} className="blue-button">
			{props.buttonName}
		</button>
	);
};

export default Button;
<button></button>;
