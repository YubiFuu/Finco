import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";

const Home = ({ token }) => {
    const [profile, setProfile] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                } else {
                    setErrorMessage(error.message);
                }
            });
    }, [token]);

    function setDotAfter3Digits(money) {
        return money?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    if (loading === true) {
        return <div className="is-loading"></div>;
    }

    return (
        <div className="home">
            <NavBar />
            <header className="display-flex__between">
                <div>
                    <p>Welcome back.</p>
                    <h1>{`${profile?.firstName} ${profile?.lastName}`}</h1>
                </div>
                <Avatar token={token} />
            </header>
            <main>
                <Card token={token} />
                <h2>Your wallet</h2>
                <div className="wallet">
                    <div className="round grey">
                        <img
                            className="icons-big"
                            src="/images/monthly-limit-icon.svg"
                            alt="total amount"
                        />
                        <div>
                            <p className="small">Current balance</p>
                            <h3 className="big">{`$${setDotAfter3Digits(
                                profile?.totalAmount?.amount.toFixed(2)
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
                                <h3 className="big">{`+$${setDotAfter3Digits(
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
                                <h3 className="big">{`-$${setDotAfter3Digits(
                                    profile?.totalAmount?.totalExpense
                                )}`}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="round grey">
                        <img
                            className="icons-big"
                            src="/images/monthly-limit-icon.svg"
                            alt="monthly limit"
                        />
                        <div>
                            <p className="small">Monthly spending limit</p>
                            <h3>{`$${setDotAfter3Digits(
                                profile?.monthlyLimit
                            )}`}</h3>
                        </div>
                    </div>
                </div>
            </main>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Home;
