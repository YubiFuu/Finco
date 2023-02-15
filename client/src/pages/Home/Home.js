import "./Home.css";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";

const Home = ({ token }) => {
    const [profile, setProfile] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);

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
                    setErrorMessage(error.message);
                }
            });
    }, [token]);

    function setDotAfter3Digits(money) {
        return money?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return (
        <main className="home">
            <p>Welcome back.</p>
            <h1>{`${profile?.firstName} ${profile?.lastName}`}</h1>
            <Card profile={profile}></Card>
            <h2>Your wallet</h2>
            <div className="wallet">
                <div className="full-sized">
                    <img
                        className="icons-big"
                        src="/images/monthly-limit-icon.svg"
                        alt="total amount"
                    />
                    <div>
                        <p>Current balance</p>
                        <h3>{`$${setDotAfter3Digits(
                            profile?.totalAmount?.amount
                        )}`}</h3>
                    </div>
                </div>
                <div className="display-flex__evenly">
                    <div className="half-sized">
                        <div>
                            <img
                                className="icons-big"
                                src="/images/Income.svg"
                                alt="income"
                            />
                            <p>Income</p>
                            <h3>{`+ $${setDotAfter3Digits(
                                profile?.totalAmount?.totalIncome
                            )}`}</h3>
                        </div>
                    </div>
                    <div className="half-sized">
                        <div>
                            <img
                                className="icons-big"
                                src="/images/Expense.svg"
                                alt="expense"
                            />
                            <p>Expense</p>
                            <h3>{`- $${setDotAfter3Digits(
                                profile?.totalAmount?.totalExpense
                            )}`}</h3>
                        </div>
                    </div>
                </div>
                <div className="full-sized">
                    <img
                        className="icons-big"
                        src="/images/monthly-limit-icon.svg"
                        alt="monthly limit"
                    />
                    <div>
                        <p>Monthly spending limit</p>
                        <h3>{`$${setDotAfter3Digits(
                            profile?.monthlyLimit
                        )}`}</h3>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
