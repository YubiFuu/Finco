import React, { useState } from "react";
import "./InputNumberField.css";

function NumberInput(props) {
	const [value, setValue] = useState("");
	const [isAmountValid, setIsAmountValid] = useState(false);

	function handleKeyDown(event) {
		// Erlaube die Verwendung von Backspace, Pfeil links/rechts, Delete-Tasten und dem Dezimaltrennzeichen
		if (
			event.key === "Backspace" ||
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight" ||
			event.key === "Delete" ||
			event.key === "," ||
			event.key === "."
		) {
			return;
		}

		// Verhindere das Einfügen von Buchstaben
		if (isNaN(event.key)) {
			event.preventDefault();
		}
	}

	function handleChange(event) {
		// Entferne alle Nicht-Zahlen und das Dezimaltrennzeichen aus dem Eingabewert
		const value = event.target.value
			.replace(/[^\d,.-]/g, "") // Nur Zahlen, Komma und Minuszeichen erlaubt
			.replace(",", ".") // Ersetze Komma durch Punkt
			.replace(/(\..*)\./g, "$1"); // Verhindere das Einfügen von mehr als einem Punkt
		setValue(value);

		// Validiere den Wert: Wenn es nur Nullen enthält, ist es ungültig
		if (/^0+$/.test(value)) {
			setIsAmountValid(false);
		} else {
			setIsAmountValid(true);
		}

		props.onSetValue(Number(value).toFixed(2).toString());
	}

	return (
		<div className="input-number-field display-flex__centered direction-column">
			<label htmlFor="input-amount">Amount</label>
			<input
				className={isAmountValid ? "input-form" : "required input-form"}
				type="text"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				id="input-amount"
				required
			/>
		</div>
	);
}

export default NumberInput;
