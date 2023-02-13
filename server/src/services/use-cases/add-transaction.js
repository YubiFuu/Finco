const { User } = require("../../models");

// to do: totalAmount logic

async function addTransaction({
    amount,
    typeTransaction,
    category,
    dateAt,
    timeAt,
    userId,
}) {
    const monthYear = dateAt.slice(3);
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

    let updatedTransaction;

    let updatedMonthlyTransaction;
    const userLimit = user.monthlyLimit;
    if (!findByMonth) {
        if (typeTransaction === "expense" && Number(amount) > userLimit) {
            throw new Error("Your monthly spending limit is not big enough!");
        } else {
            updatedMonthlyTransaction = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        monthlyTransaction: {
                            month: monthYear,
                            [typeTransaction === "income"
                                ? "monthlyIncome"
                                : "monthlyExpense"]: Number(amount),
                        },
                    },
                },
                { new: true }
            ).exec();
            updatedTransaction = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        transaction: {
                            amount,
                            typeTransaction,
                            category,
                            dateAt,
                            timeAt,
                        },
                    },
                },
                { new: true }
            ).exec();
        }
    } else {
        const expenseLimit =
            findByMonth.monthlyTransaction[0].monthlyExpense + Number(amount);
        if (typeTransaction === "expense" && expenseLimit > userLimit) {
            throw new Error("Your monthly spending limit is not big enough!");
        } else {
            updatedMonthlyTransaction = await User.updateOne(
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
            updatedTransaction = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        transaction: {
                            amount,
                            typeTransaction,
                            category,
                            dateAt,
                            timeAt,
                        },
                    },
                },
                { new: true }
            ).exec();
        }
    }

    return {
        transaction: user.transaction,
        monthlyTransaction: user.monthlyTransaction,
    };
}

module.exports = {
    addTransaction,
};
