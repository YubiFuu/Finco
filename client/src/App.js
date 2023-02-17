import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { apiBaseUrl } from "./api";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Protected from "./components/Protected/Protected";
import AccountPage from "./pages/Account/AccountPage/AccountPage";
import EditProfile from "./pages/Account/EditProfile/EditProfile";
import ForgotPassword from "./pages/Account/ForgotPassword/ForgotPassword";
import LogIn from "./pages/Account/LogIn/LogIn";
import LogOut from "./pages/Account/LogOut/LogOut";
import ResetPassword from "./pages/Account/ResetPassword/ResetPassword";
import SignUp from "./pages/Account/SignUp/SignUp";
import AddTransaction from "./pages/AddTransaction/AddTransaction";
import AllTransactions from "./pages/AllTransactions/AllTransactions";
import Home from "./pages/Home/Home";
import ReportPage from "./pages/ReportPage/ReportPage";

function App() {
    const [token, setToken] = useState(null);
    const [isFromSignUp, setIsFromSignUp] = useState(true);

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
                credentials: "include",
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
                    <Route path="/register" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:resetPwdToken"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/"
                        element={
                            <Protected token={token} setToken={setToken}>
                                <Home
                                    token={token}
                                    setIsFromSignUp={setIsFromSignUp}
                                />
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
                    <Route
                        path="/account"
                        element={
                            <Protected token={token} setToken={setToken}>
                                <AccountPage token={token} />
                            </Protected>
                        }
                    />
                    <Route
                        path="/report"
                        element={
                            <Protected token={token} setToken={setToken}>
                                <ReportPage token={token} />
                            </Protected>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
