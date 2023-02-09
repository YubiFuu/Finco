const { User } = require("../../models");

async function addTransaction({
    amount,
    typeTransaction,
    category,
    dateAt,
    timeAt,
    userId,
}) {
    const user = await User.findByIdAndUpdate(
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

    return {
        transaction: user.transaction,
        // amount: user.transaction.amount,
        // typeTransaction: user.transaction.typeTransaction,
        // category: user.transaction.category,
        // dateAt: user.transaction.dateAt,
        // timeAt: user.transaction.timeAt,
    };
}

module.exports = {
    addTransaction,
};
