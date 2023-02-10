import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProfile from "./pages/Account/EditProfile/EditProfile";
import LogIn from "./pages/Account/LogIn/LogIn";
import SignUp from "./pages/Account/SignUp/SignUp";

function App() {
	const [token, setToken] = useState(null);
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
			console.log("about to do silet refresh");

			fetch("http://localhost:9001/api/v1/users/refresh-token", {
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
				<SignUp />
				<EditProfile />
				<LogIn setToken={setToken} />
			</BrowserRouter>
		</div>
	);
}

export default App;
