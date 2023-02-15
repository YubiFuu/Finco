import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { apiBaseUrl } from "./api";
import "./App.css";
import Protected from "./components/Protected/Protected";
import EditProfile from "./pages/Account/EditProfile/EditProfile";
import ForgotPassword from "./pages/Account/ForgotPassword/ForgotPassword";
import LogIn from "./pages/Account/LogIn/LogIn";
import LogOut from "./pages/Account/LogOut/LogOut";
import SignUp from "./pages/Account/SignUp/SignUp";
import AddTransaction from "./pages/AddTransaction/AddTransaction";
import AllTransactions from "./pages/AllTransactions/AllTransactions";
import Home from "./pages/Home/Home";
// import ReportPage from "./pages/ReportPage/ReportPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
	const [token, setToken] = useState(null);
	const [isFromSignUp, setIsFromSignUp] = useState(false);

	console.log(Date.now(), token);
	useEffect(() => {
		if (!token) {
			return;
		}
		// refresh token before it expires
		const tokenPayloadBase64Str = token.split(".")[1];
		const tokenPayloadJsonStr = atob(tokenPayloadBase64Str);
		const tokenPayload = JSON.parse(tokenPayloadJsonStr);
		const exp = tokenPayload.exp;
		const nowInSeconds = Math.floor(Date.now() / 1000);

		const tenSecondsBefore = 10;
		const triggerSilentTokenRefreshInSeconds =
			exp - nowInSeconds - tenSecondsBefore;

		console.log({ triggerSilentTokenRefreshInSeconds });
		const refreshTokenTimeoutID = setTimeout(() => {
			console.log("about to do silent refresh");

			fetch(`${apiBaseUrl}/users/refresh-token`, {
				method: "POST",
				credentials: "include", // here: take refresh token from httpOnly secure cookie and send it
			})
				.then((res) => res.json())
				.then(({ result }) => {
					setToken(result?.accessToken);
				});
		}, triggerSilentTokenRefreshInSeconds * 1000);

		return () => clearTimeout(refreshTokenTimeoutID);
	}, [token]);

	return (
		<div className="App">
			<BrowserRouter>
				{/* <NavBar /> */}
				<Routes>
					<Route
						path="/login"
						element={<LogIn setToken={setToken} />}
					/>
					<Route
						path="/logout"
						element={<LogOut setToken={setToken} />}
					/>
					<Route
						path="/register"
						element={<SignUp setIsFromSignUp={setIsFromSignUp} />}
					/>
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
					<Route
						path="/"
						element={
							<Protected token={token} setToken={setToken}>
								<Home token={token} />
								<NavBar />
							</Protected>
						}
					/>
					<Route
						path="/edit-profile"
						element={
							<Protected
								token={token}
								setToken={setToken}
								isFromSignUp={isFromSignUp}
								setIsFromSignUp={setIsFromSignUp}
							>
								<EditProfile token={token} />
							</Protected>
						}
					/>
					<Route
						path="/all-transactions"
						element={
							<Protected token={token} setToken={setToken}>
								<AllTransactions token={token} />
							</Protected>
						}
					/>
					<Route
						path="/add-transactions"
						element={
							<Protected token={token} setToken={setToken}>
								<AddTransaction token={token} />
							</Protected>
						}
					/>
					{/* <Route
                        path="/report"
                        element={
                            <Protected token={token} setToken={setToken}>
                                <ReportPage token={token} />
                            </Protected>
                        }
                    /> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
