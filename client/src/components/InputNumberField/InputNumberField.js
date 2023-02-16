import React, { useState } from "react";
import "./InputNumberField.css";

function NumberInput(props) {
	const [value, setValue] = useState("");
	const [isAmountValid, setIsAmountValid] = useState(false);

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
		setValue(value);
		props.onSetValue(value);
	}

	return (
		<div className="input-number-field display-flex__centered direction-column">
			<label htmlFor="" name="input-amount">
				Amount
			</label>
			<input
				className={isAmountValid ? `input-form` : "required input-form"}
				type="text"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onClick={() => setIsAmountValid(true)}
				id="input-amount"
				required
			/>
		</div>
	);
}

export default NumberInput;
