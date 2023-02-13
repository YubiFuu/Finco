import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import TransactionItem from "../../components/TransactionItem/TransactionItem";

import "./AllTransactions.css";

const AllTransactions = ({ token }) => {
	const [userTransactions, setUserTransactions] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	console.log("AllTransactions:", token);

	useEffect(() => {
		fetch(`${apiBaseUrl}/users/all-transactions`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((response) => {
				setUserTransactions(response.result.transaction);
				console.log("Response:", response.result.transaction);
			});
	}, [token]);

	return (
		<div className="all-transactions">
			<div className="display-flex__between">
				<img className="logo" src="/Finco2.svg" alt="finco-logo" />
				<Avatar />
			</div>
			<div className="search-row">
				<h2>All Transactions</h2>
				<input type="text" placeholder="🔍" />
				<input type="date" />
			</div>
			<div className="total-inc-exp-wrapper display-flex__evenly">
				<div className="income-total display-flex__centered">
					<img src="" alt="INCOME-PIC" />
					<div>
						<p>Income</p>
						<h3>+ ${"4.302"}</h3>
					</div>
				</div>
				<div className="expense-total display-flex__centered">
					<img src="" alt="EXPENSE-PIC" />
					<div>
						<p>Income</p>
						<h3>- ${"6.302"}</h3>
					</div>
				</div>
			</div>
			<div>
				{userTransactions.map((e) => {
					return (
						<TransactionItem
							category={e.category}
							timeAt={e.timeAt}
							dateAt={e.dateAt}
							amount={e.amount}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default AllTransactions;
