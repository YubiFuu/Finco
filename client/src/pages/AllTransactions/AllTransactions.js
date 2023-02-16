import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import NavBar from "../../components/NavBar/NavBar";
import "./AllTransactions.css";

const AllTransactions = ({ token }) => {
    const [profile, setProfile] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState([]);

    const [userTransactions, setUserTransactions] = useState([]);
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [toggleFilterIncome, setToggleFilterIncome] = useState(false);
    const [toggleFilterExpense, setToggleFilterExpense] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    console.log("AllTransactions:", token);

    //==================== Fetch Transactions =======================

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
                setFiltered(response.result.transaction);
                setIsLoading(false);
                console.log("Response:", response);
            });
    }, [token]);

    //================ Fetch Profile =======================

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
                    setProfile(result);
                } else {
                    setErrorMessage2(error.message);
                }
            });
    }, [token]);

    //================== Tausender Trennpunkt ==================
    function setDotAfter3Digits(money) {
        return money?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }

    // ================= Filter by Input ======================
    function filterByName() {
        const userInput = document.getElementById("search-input");
        console.log("search input:", userInput.value);
        let filteredExpenses = [];

        userTransactions.map((exp) => {
            if (exp.category.includes(userInput.value.toString())) {
                filteredExpenses.push(exp);
            }
        });
        console.log("FILTERED:", filteredExpenses);

        return filteredExpenses.length !== 0
            ? setFiltered(filteredExpenses)
            : setFiltered(userTransactions);
    }
    //=========================================================

    // ================= Filter by Income ======================
    function filterByIncome() {
        setToggleFilterExpense(false);
        setToggleFilterIncome(!toggleFilterIncome);
    }

    useEffect(() => {
        let filteredExpenses = [];
        userTransactions.map((exp) => {
            if (exp.typeTransaction === "income") {
                filteredExpenses.push(exp);
            }
        });
        console.log("FILTERED:", filteredExpenses);
        console.log("Income:", toggleFilterIncome);
        console.log("Expense:", toggleFilterExpense);
        return toggleFilterIncome
            ? setFiltered(filteredExpenses)
            : setFiltered(userTransactions);
    }, [toggleFilterIncome]);
    //=========================================================

    // ================= Filter by Expenses ======================
    function filterByExpense() {
        setToggleFilterIncome(false);
        setToggleFilterExpense(!toggleFilterExpense);
    }

    useEffect(() => {
        let filteredExpenses2 = [];
        userTransactions.map((exp) => {
            if (exp.typeTransaction === "expense") {
                filteredExpenses2.push(exp);
            }
        });
        console.log("FILTERED:", filteredExpenses2);
        console.log("Income:", toggleFilterIncome);
        console.log("Expense:", toggleFilterExpense);
        return toggleFilterExpense
            ? setFiltered(filteredExpenses2)
            : setFiltered(userTransactions);
    }, [toggleFilterExpense]);
    //=========================================================

    console.log(searchActive);
    return (
        <div
            className="all-transactions"
            onClick={() =>
                searchActive === true ? setSearchActive(false) : null
            }
        >
            <NavBar />
            <header className="display-flex__between">
                <img
                    className="logo"
                    src="/images/Finco2.svg"
                    alt="finco-logo"
                />
                <Avatar token={token} />
            </header>
            <div className="search-row">
                <h2>All Transactions</h2>
                <input
                    className={searchActive && "search-active"}
                    id="search-input"
                    onClick={() => setSearchActive(true)}
                    onChange={filterByName}
                    type="text"
                />
                <input type="date" />
            </div>
            <div className="total-inc-exp-wrapper display-flex__evenly">
                <div onClick={filterByIncome} className="income-img round grey">
                    <img
                        className="icons-big"
                        src="/images/Income.svg"
                        alt="INCOME-PIC"
                    />
                    <div>
                        <p>Income</p>
                        <h3>{`+ $${setDotAfter3Digits(
                            profile?.totalAmount?.totalIncome
                        )}`}</h3>
                    </div>
                </div>
                <div
                    onClick={filterByExpense}
                    className="expense-img round grey"
                >
                    <img
                        className=" icons-big"
                        src="/images/Expense.svg"
                        alt="EXPENSE-PIC"
                    />
                    <div>
                        <p>Expense</p>
                        <h3>{`- $${setDotAfter3Digits(
                            profile?.totalAmount?.totalExpense
                        )}`}</h3>
                    </div>
                </div>
            </div>
            <h3>Recent Transactions</h3>
            <div>
                {filtered.map((e, index) => {
                    return (
                        <TransactionItem
                            key={index}
                            category={e.category}
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
