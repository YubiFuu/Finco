import "./TransactionItem.css";

const TransactionItem = (props) => {
	return (
		<div className="transaction-item display-flex__centered">
			<img className="logo" src="./images/Finco2.svg" alt="IMG" />
			<div className="middle-part display-flex__between">
				<h3>{props.category}</h3>
				<p>
					<span>{props.timeAt}</span> <span>{props.dateAt}</span>
				</p>
			</div>
			<div className="display-flex__centered">
				<h2>$ {props.amount}</h2>
			</div>
		</div>
	);
};

export default TransactionItem;
