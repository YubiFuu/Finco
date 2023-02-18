import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import ReportChart from "../../components/Chart/ReportChart";
import NavBar from "../../components/NavBar/NavBar";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import "./ReportPage.css";

const ReportPage = ({ token }) => {
    const [profile, setProfile] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState([]);

    const [userTransactions, setUserTransactions] = useState([]);
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [toggleFilterIncome, setToggleFilterIncome] = useState(false);
    const [toggleFilterExpense, setToggleFilterExpense] = useState(false);

    //==================== Fetch Transactions =======================

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/v1/users/all-transactions`, {
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
            });
    }, [token]);

    //================ Fetch Profile =======================

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/v1/users/profile`, {
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

        return toggleFilterExpense
            ? setFiltered(filteredExpenses2)
            : setFiltered(userTransactions);
    }, [toggleFilterExpense]);
    //=========================================================
    return (
        <div className="all-transactions">
            <NavBar />
            <header className="display-flex__between">
                <img
                    className="logo"
                    src="/images/Finco2.svg"
                    alt="finco-logo"
                />
                <Avatar token={token} />
            </header>
            <main>
                <ReportChart token={token} />

                <div className="total-inc-exp-wrapper display-flex__evenly">
                    <div className="round grey">
                        <img
                            onClick={filterByIncome}
                            className="income-img icons-big"
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
                    <div className="round grey">
                        <img
                            onClick={filterByExpense}
                            className="expense-img icons-big"
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
                <h2>Recent Transactions</h2>
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
            </main>
        </div>
    );
};

export default ReportPage;
