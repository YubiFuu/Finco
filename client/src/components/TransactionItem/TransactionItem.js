import "./TransactionItem.css";

const TransactionItem = (props) => {
	const expensesIconsPath = "./images/catagoryIcons/Expenses";
	const incomeIconsPath = "./images/catagoryIcons/income";
	function pickIcon() {
		console.log("inside pickIcon");
		if (props.category === "food&drink") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/food&drink.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "shopping") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/shopping.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "insurance") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/insurance.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "taxes") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/taxes.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "rent") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/rent.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "transportation") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/transportation.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "personal") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/personal.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "healthcare") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/healthcare.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "others-exp") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/others-exp.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "salary") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/salary.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "passive") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/passive-income.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "pension") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/pension.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "gifts") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/gifts.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "others-inc") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/others-inc.svg`}
					alt="Icon"
				/>
			);
		}
	}

	return (
		<div className="transaction-item display-flex__centered">
			{pickIcon()}

			<div className="middle-part display-flex__between">
				<h3>{props.category}</h3>
				<p>
					<span>{props.timeAt}</span> <span>{props.dateAt}</span>
				</p>
			</div>
			<div className="display-flex__centered">
				<h2
					style={{
						color:
							props.typeTransaction === "income"
								? "#3a94ff"
								: "orange",
					}}
				>
					{props.typeTransaction === "expense" ? "-" : "+"}$
					{props.amount}
				</h2>
			</div>
		</div>
	);
};

export default TransactionItem;
