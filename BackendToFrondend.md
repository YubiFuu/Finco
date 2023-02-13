# Info - from Backend dev to Frontend dev

Routes:
BaseUrl Users: "/api/v1/users"

GET Routes:

-   "/all-transactions"
    res: monthlyTransaction, transaction
-   "/profile"
    res: firstName, lastName, email, profilePicture, cardNumber, monthlyLimit, totalAmount
    POST:
-   "/login"
    req: email, password
-   "/register"
    req: firstName, lastName, email, password
-   "/new-transaction"
    req: amount, typeTransaction, category, dateAt, timeAt
-   "forgot-password"
    req: email
-   "reset-password"
    req: password

PUT:

-   "/edit-profile"
    req: profilePicture, cardNumber, monthlyLimit

///////////////////////

databank schema:

{
firstName: { type: String, required: true },
lastName: { type: String, required: true },
email: { type: String, required: true },
profilePicture: { type: String, default: avatarPlaceHolder },
cardNumber: { type: String, default: "000" },
monthlyLimit: { type: Number, default: 6000 },
monthlyTransaction: [
{
month: { type: String },
monthlyIncome: { type: Number, default: 0 },
monthlyExpense: { type: Number, default: 0 },
},
],
totalAmount: { type: Number, default: 100 },
passwordHash: { type: String, required: true },
passwordSalt: { type: String, required: true },
transaction: [
{
amount: { type: String, required: true },
typeTransaction: { type: String, required: true },
category: { type: String, required: true },
dateAt: { type: String, required: true },
timeAt: { type: String, required: true },
},
],
},
{
timestamps: true,
}
