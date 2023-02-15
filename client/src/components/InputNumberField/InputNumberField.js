import React, { useState } from "react";
import "./InputNumberField.css";

function NumberInput(props) {
	const [value, setValue] = useState("");

	function handleKeyDown(event) {
		// Erlaube die Verwendung von Backspace, Pfeil links/rechts und Delete-Tasten
		if (
			event.key === "Backspace" ||
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight" ||
			event.key === "Delete"
		) {
			return;
		}

		// Verhindere das Einfügen von Buchstaben
		if (isNaN(event.key)) {
			event.preventDefault();
		}
	}

	function handleChange(event) {
		// Entferne alle Nicht-Zahlen aus dem Eingabewert
		const value = event.target.value.replace(/[^0-9]/g, "");
		props.onSetValue(value);
		setValue(value);
	}

	return (
		<input
			className="input-form"
			type="text"
			value={value}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
}

export default NumberInput;
