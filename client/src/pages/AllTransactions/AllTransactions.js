import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import TransactionItem from "../../components/TransactionItem/TransactionItem";

import "./AllTransactions.css";

const AllTransactions = ({ token }) => {
    const [userTransactions, setUserTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    const [incomeTotal, setIncomeTotal] = useState([]);
    const [expenseTotal, setExpenseTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
                setMonthlyTransactions(response.result.monthlyTransactions);
                setUserTransactions(response.result.transaction);
                setIsLoading(false);
            });
    }, [token]);

    /*
	if (isLoading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}
	userTransactions.map((e) => {
		if (e.typeTransaction === "income") {
			setIncomeTotal((prevIncome) => prevIncome + e.amount);
			console.log("incomeTotal:", incomeTotal);
		}
		if (e.typeTransaction === "expense") {
			setExpenseTotal((prevExpense) => prevExpense + e.amount);
			console.log("expenseTotal:", expenseTotal);
		}
	});
	*/

    return (
        <div className="all-transactions">
            <div className="display-flex__between">
                <img
                    className="logo"
                    src="/images/Finco2.svg"
                    alt="finco-logo"
                />
                <Avatar />
            </div>
            <div className="search-row">
                <h2>All Transactions</h2>
                <input type="text" placeholder="🔍" />
                <input type="date" />
            </div>
            <div className="total-inc-exp-wrapper display-flex__evenly">
                <div className="income-total display-flex__evenly">
                    <img
                        className="icons-big"
                        src="/images/Income.svg"
                        alt="INCOME-PIC"
                    />
                    <div>
                        <p>Income</p>
                        <h3>+ ${incomeTotal}</h3>
                    </div>
                </div>
                <div className="expense-total display-flex__evenly">
                    <img
                        className="icons-big"
                        src="/images/Expense.svg"
                        alt="EXPENSE-PIC"
                    />
                    <div>
                        <p>Expense</p>
                        <h3>- ${expenseTotal}</h3>
                    </div>
                </div>
            </div>
            <h3>Recent Transactions</h3>
            <div>
                {userTransactions.map((e, index) => {
                    return (
                        <TransactionItem
                            key={index}
                            category={e.category}
                            timeAt={e.timeAt}
                            dateAt={e.dateAt}
                            amount={e.amount}
                            typeTransaction={e.typeTransaction}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AllTransactions;
