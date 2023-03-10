import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import Card from "../../components/Card/Card";
import InputNumberField from "../../components/InputNumberField/InputNumberField";
import NavBar from "../../components/NavBar/NavBar";
import "./AddTransaction.css";

const AddTransaction = ({ token }) => {
    const today = new Date().toISOString().substr(0, 16);
    const [transactionType, setTransactionType] = useState("income");
    const [amount, setAmount] = useState("");
    const [typeTransaction, setTypeTransaction] = useState("income");
    const [category, setCategory] = useState("");
    const [dateAt, setDateAt] = useState(today);

    const [isCategoryValid, setIsCategoryValid] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function handleTransactionTypeChange(event) {
        setTransactionType(event.target.value);
        setTypeTransaction(event.target.value);
        console.log("transactionType:", transactionType);
        console.log("typeTransaction:", typeTransaction);
        console.log("category:", category);
    }

    function addTransaction(event) {
        event.preventDefault();

        if (!amount || category === "") {
            setIsCategoryValid(false);
            setErrorMessage("Check all required fields");
            return;
        }

        fetch(`${apiBaseUrl}/api/v1/users/new-transaction`, {
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

                return navigate("/all-transactions");
            });
    }

    //==================== Date Converter to apply to input datetime-local =======================
    function dateNow() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let MM = today.getMinutes();

        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + MM;
    }
    //=========================================================

    return (
        <div className="add-transaction">
            <NavBar />
            <header className="display-flex__between">
                <ButtonBack /> <Avatar token={token} />
            </header>
            <main>
                <form>
                    <div className="select-wrapper title-wrapper">
                        <select
                            className={
                                transactionType === "income"
                                    ? "input-form transaction-income"
                                    : "input-form transaction-expense"
                            }
                            name="transaction-type"
                            id="transaction-type"
                            value={transactionType}
                            onChange={handleTransactionTypeChange}
                        >
                            <option value="income">Add income</option>
                            <option value="expense">Add expense</option>
                        </select>
                        <h3 className="error-message"> {errorMessage}</h3>
                    </div>
                    <Card token={token} />
                    <div className="display-flex__centered direction-column">
                        <InputNumberField onSetValue={setAmount} />
                        <label htmlFor="category">Category</label>

                        {transactionType === "income" ? (
                            <div className="select-wrapper">
                                <select
                                    className={
                                        isCategoryValid
                                            ? "input-form transaction-category"
                                            : "required input-form transaction-category"
                                    }
                                    id="category"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    onClick={() => setIsCategoryValid(true)}
                                >
                                    <option
                                        value=""
                                        disabled
                                        selected
                                        hidden
                                        required
                                    >
                                        Choose Option
                                    </option>
                                    <option value="Salary">Salary</option>
                                    <option value="Passive Income">
                                        Passive Income
                                    </option>
                                    <option value="Pension">Pension</option>
                                    <option value="Gifts">Gifts</option>
                                    <option value="Other Income">
                                        Other Income
                                    </option>
                                </select>
                            </div>
                        ) : (
                            <div className="select-wrapper">
                                <select
                                    className={
                                        isCategoryValid
                                            ? "input-form transaction-category"
                                            : "required input-form transaction-category"
                                    }
                                    id="category"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    onClick={() => setIsCategoryValid(true)}
                                >
                                    <option
                                        value=""
                                        disabled
                                        selected
                                        hidden
                                        required
                                    >
                                        Choose Option
                                    </option>
                                    <option value="Food&Drink">
                                        Food&Drink
                                    </option>
                                    <option value="Rent">Rent</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Taxes">Taxes</option>
                                    <option value="Transportation">
                                        Transportation
                                    </option>
                                    <option value="Personal">Personal</option>
                                    <option value="Healthcare">
                                        Healthcare
                                    </option>
                                    <option value="Other Expenses">
                                        Other-Expenses
                                    </option>
                                </select>
                            </div>
                        )}
                        <label htmlFor="date">Date</label>
                        <input
                            className="input-form transaction-category"
                            type="datetime-local"
                            id="date"
                            onChange={(e) => setDateAt(e.target.value)}
                            value={dateAt}
                            min={dateNow()}
                        />
                    </div>
                    <Button
                        function={addTransaction}
                        buttonName={"Add Transaction"}
                    />
                </form>
            </main>
        </div>
    );
};

export default AddTransaction;
