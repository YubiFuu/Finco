import { useEffect, useState } from "react";
import "./Card.css";
const Card = ({ profile }) => {
	const [maskedNumber, setMaskedNumber] = useState("");
	const [last4Digits, setLast4Digits] = useState("");
	const [cardNumber, setCardNumber] = useState([]);
	const empty = "";

	useEffect(() => {
		setCardNumber(profile?.cardNumber);
	}, [profile]);

	useEffect(() => {
		async function generateMaskedNumber() {
			await setLast4Digits(cardNumber.slice(-4));
			const firstDigits = await cardNumber.slice(0, -4);
			setMaskedNumber(empty.padStart(firstDigits.length, "*"));
		}
		if (cardNumber) {
			generateMaskedNumber();
		}
	}, [cardNumber]);

	return (
		<div className="card">
			<div>
				<p>Debit Card</p>
				<p>{`${maskedNumber} ${last4Digits}`}</p>
			</div>
		</div>
	);
};

export default Card;
