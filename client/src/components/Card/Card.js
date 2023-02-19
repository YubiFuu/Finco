import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import "./Card.css";
const Card = ({ token }) => {
	const [maskedNumber, setMaskedNumber] = useState("");
	const [last4Digits, setLast4Digits] = useState("");
	const [cardNumber, setCardNumber] = useState([]);
	const empty = "";

	useEffect(() => {
		fetch(`${apiBaseUrl}/users/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(({ status, result, error }) => {
				if (status === "ok") {
					setCardNumber(result.cardNumber);
				}
			});
	}, [token]);

	useEffect(() => {
		async function generateMaskedNumber() {
			await setLast4Digits(cardNumber?.slice(-4));
			const firstDigits = await cardNumber?.slice(0, -4);
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
