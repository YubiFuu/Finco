import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import InputNumberField from "../../components/InputNumberField/InputNumberField";
import "./AddTransaction.css";

const AddTransaction = ({ token }) => {
	const [value, setValue] = useState("");
	const [transactionType, setTransactionType] = useState("income");
	const [amount, setAmount] = useState("");
	const [typeTransaction, setTypeTransaction] = useState("");
	const [category, setCategory] = useState("");
	const [dateAt, setDateAt] = useState("");

	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	function handleTransactionTypeChange(event) {
		setTransactionType(event.target.value);
	}

	function addTransaction(event) {
		event.preventDefault(); // page reload verhindern!

		fetch(`${apiBaseUrl}/users/new-transaction`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				amount,
				typeTransaction,
				category,
				dateAt,
			}),
		})
			.then((res) => res.json())
			.then(({ status, error }) => {
				if (status === "error") {
					// error handling...
					setErrorMessage(error.message);
					return;
				}

				return navigate("/home");
			});
	}

	return (
		<div className="add-transaction">
			<div className="display-flex__between">
				<ButtonBack /> <Avatar />
			</div>
			<form>
				<select
					className="input-form"
					name="transaction-type"
					id="transaction-type"
					value={transactionType}
					onChange={handleTransactionTypeChange}
				>
					<option value="income">Add income</option>
					<option value="expense">Add expense</option>
				</select>
				<h3>Credit Card Placeholder</h3>
				<div className="display-flex__centered direction-column">
					<InputNumberField
						onChange={(e) => setValue(e.target.value)}
						onSetValue={setValue}
					/>
					<label htmlFor="category">Category</label>
					<select
						className="input-form"
						id="category"
						onChange={(e) => setCategory(e.target.value)}
					>
						{transactionType === "income" ? (
							<>
								<option value="Salary">Salary</option>
								<option value="Passive">Passive Income</option>
								<option value="Pension">Pension</option>
								<option value="Gifts">Gifts</option>
								<option value="Other-Income">
									Other Income
								</option>
							</>
						) : (
							<>
								<option value="Food&Drink">Food&Drink</option>
								<option value="Rent">Rent</option>
								<option value="Shopping">Shopping</option>
								<option value="Insurance">Insurance</option>
								<option value="Taxes">Taxes</option>
								<option value="Transportation">
									Transportation
								</option>
								<option value="Personal">Personal</option>
								<option value="Healthcare">Healthcare</option>
								<option value="Other-Expenses">
									Other-Expenses
								</option>
							</>
						)}
					</select>
					<input
						className="input-form"
						type="datetime-local"
						onChange={(e) => setDateAt(e.target.value)}
					/>
				</div>
				<Button
					function={addTransaction}
					buttonName={"Add Transaction"}
					/*buttonName={`Add ${
						document.getElementById("transaction-type").value
					}`}*/
				/>
			</form>
		</div>
	);
};

export default AddTransaction;
