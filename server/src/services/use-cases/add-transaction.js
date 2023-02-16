const { User } = require("../../models");

// to do: totalAmount logic

async function addTransaction({
    amount,
    typeTransaction,
    category,
    dateAt,
    userId,
}) {
    const monthYear = dateAt.slice(0, 7);
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new Error("User not Found");
    }
    const findByMonth = await User.findOne({
        _id: userId,
        monthlyTransaction: {
            $elemMatch: {
                month: monthYear,
            },
        },
    }).exec();

    await casesHandler();

    function casesHandler() {
        let updatedTransaction;
        let updatedMonthlyTransaction;
        const userLimit = user.monthlyLimit;
        const notEnoughCredit = user.totalAmount.amount - Number(amount);
        if (!findByMonth) {
            if (typeTransaction === "expense" && Number(amount) > userLimit) {
                throw new Error(
                    "Your monthly spending limit is not big enough!"
                );
            } else if (typeTransaction === "expense" && notEnoughCredit < 0) {
                throw new Error("Not enough credit in your wallet!");
            } else {
                updatedMonthlyTransaction = User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            monthlyTransaction: {
                                $each: [
                                    {
                                        month: monthYear,
                                        [typeTransaction === "income"
                                            ? "monthlyIncome"
                                            : "monthlyExpense"]: Number(amount),
                                    },
                                ],
                                $position: 0,
                            },
                        },
                    },
                    { new: true }
                ).exec();
                updatedTransaction = User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            transaction: {
                                $each: [
                                    {
                                        amount,
                                        typeTransaction,
                                        category,
                                        dateAt,
                                    },
                                ],
                                $position: 0,
                            },
                        },
                        $inc: {
                            "totalAmount.amount":
                                (typeTransaction === "expense" ? -1 : 1) *
                                Number(amount),
                            [typeTransaction === "income"
                                ? "totalAmount.totalIncome"
                                : "totalAmount.totalExpense"]: Number(amount),
                        },
                    },
                    { new: true }
                ).exec();
            }
        } else {
            const expenseLimit =
                findByMonth.monthlyTransaction[0].monthlyExpense +
                Number(amount);
            if (typeTransaction === "expense" && expenseLimit > userLimit) {
                throw new Error(
                    "Your monthly spending limit is not big enough!"
                );
            } else if (typeTransaction === "expense" && notEnoughCredit < 0) {
                throw new Error("Not enough credit in your wallet!");
            } else {
                updatedMonthlyTransaction = User.updateOne(
                    {
                        _id: userId,
                        "monthlyTransaction.month": monthYear,
                    },
                    {
                        $inc: {
                            [typeTransaction === "income"
                                ? "monthlyTransaction.$.monthlyIncome"
                                : "monthlyTransaction.$.monthlyExpense"]:
                                Number(amount),
                        },
                    },
                    { new: true }
                ).exec();
                updatedTransaction = User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            transaction: {
                                $each: [
                                    {
                                        amount,
                                        typeTransaction,
                                        category,
                                        dateAt,
                                    },
                                ],
                                $position: 0,
                            },
                        },
                        $inc: {
                            "totalAmount.amount":
                                (typeTransaction === "expense" ? -1 : 1) *
                                Number(amount),
                            [typeTransaction === "income"
                                ? "totalAmount.totalIncome"
                                : "totalAmount.totalExpense"]: Number(amount),
                        },
                    },
                    { new: true }
                ).exec();
            }
        }
    }

    return {
        totalAmount: user.totalAmount,
        transaction: user.transaction,
        monthlyTransaction: user.monthlyTransaction,
    };
}

module.exports = {
    addTransaction,
};
