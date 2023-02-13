import Avatar from "../Avatar/Avatar";
import ButtonBack from "../ButtonBack/ButtonBack";
import "./TransactionsForm.css";

const TransactionsForm = () => {
	return (
		<div className="transactions-form">
			<h1>This is Transactions Form</h1>
			<div className="wrapper-avatar__row">
				<ButtonBack /> <Avatar />
			</div>
			<div className="wrapper-search__row">
				<input
					className="input-form__searchbar"
					type="text"
					placeholder="🔍"
				/>
				<input type="date" />
			</div>
		</div>
	);
};

export default TransactionsForm;
