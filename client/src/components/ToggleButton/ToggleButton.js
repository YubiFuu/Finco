import React, { useState } from "react";
import styled from "styled-components";
import "./ToggleButton.css";

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 25px;
	width: 50px;
	background-color: transparent;
`;

const Slide = styled.div`
	flex: 1;
	height: 25px;
	background-color: ${({ isOn }) => (isOn ? "orange" : "gray")};
	position: relative;
	border-radius: 12.5px;
`;

const CircleButton = styled.button`
	background-color: white;
	border: none;
	border-radius: 50%;
	width: 21px;
	height: 21px;
	position: absolute;
	left: ${({ isOn }) => (isOn ? "calc(100% - 22px)" : "0")};
	top: 8%;
	transition: left 0.2s ease-in-out;
`;

function ToggleButton() {
	const [isOn, setIsOn] = useState(true);

	const handleToggle = () => {
		setIsOn(!isOn);
	};

	return (
		<Container>
			<Slide isOn={isOn}>
				<CircleButton isOn={isOn} onClick={handleToggle} />
			</Slide>
		</Container>
	);
}

export default ToggleButton;
