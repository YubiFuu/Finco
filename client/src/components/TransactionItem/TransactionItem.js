import "./TransactionItem.css";

const TransactionItem = (props) => {
	const expensesIconsPath = "./images/catagoryIcons/Expenses";
	const incomeIconsPath = "./images/catagoryIcons/Income";
	function pickIcon() {
		if (props.category === "Food&Drink") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/food&drink.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Shopping") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/shopping.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Insurance") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/insurance.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Taxes") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/taxes.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Rent") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/rent.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Transportation") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/transportation.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Personal") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/personal.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Healthcare") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/healthcare.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Other Expenses") {
			return (
				<img
					className="logo icon-color-expense"
					src={`${expensesIconsPath}/others-exp.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Salary") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/salary.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Passive Income") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/passive-income.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Pension") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/pension.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Gifts") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/gifts.svg`}
					alt="Icon"
				/>
			);
		}
		if (props.category === "Other Income") {
			return (
				<img
					className="logo icon-color-income"
					src={`${incomeIconsPath}/others-inc.svg`}
					alt="Icon"
				/>
			);
		}
	}
	function changeTimeString(timeString) {
		const time = timeString.split(/-|T|:/);
		return (
			time[3] +
			"." +
			time[4] +
			" , " +
			time[2] +
			"." +
			time[1] +
			"." +
			time[0]
		);
	}

	return (
		<div className="transaction-item display-flex__centered round grey box-shadow">
			{pickIcon()}

			<div className="middle-part display-flex__between">
				<h3>{props.category}</h3>
				<p>
					<span>{props.timeAt}</span>{" "}
					<span>{changeTimeString(props?.dateAt)}</span>
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
