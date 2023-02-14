import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { apiBaseUrl } from "./api";
import "./App.css";
import Protected from "./components/Protected/Protected";
import TransactionsForm from "./components/TransactionsForm/TransactionsForm";
import EditProfile from "./pages/Account/EditProfile/EditProfile";
import ProfilePage from "./pages/Account/EditProfile/ProfilePage";
import LogIn from "./pages/Account/LogIn/LogIn";
import SignUp from "./pages/Account/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AllTransactions from "./pages/AllTransactions/AllTransactions";

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
                <AllTransactions token={token} />
                <Home token={token} />

                <SignUp />
                <EditProfile />
                <LogIn setToken={setToken} />
                <Protected token={token} setToken={setToken}>
                    <ProfilePage token={token} />
                </Protected>
            </BrowserRouter>
        </div>
    );
}

export default App;
