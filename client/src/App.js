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
// import LogOut from "./pages/Account/LogOut/LogOut";
import ResetPassword from "./pages/Account/ResetPassword/ResetPassword";
import SignUp from "./pages/Account/SignUp/SignUp";
import AddTransaction from "./pages/AddTransaction/AddTransaction";
import AllTransactions from "./pages/AllTransactions/AllTransactions";
import Home from "./pages/Home/Home";
import IntroPage from "./pages/IntroPage/IntroPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ReportPage from "./pages/ReportPage/ReportPage";

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
            console.log("about to do silent refresh");

            fetch(`${apiBaseUrl}/api/v1/users/refresh-token`, {
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
                    <Route path="/" element={<IntroPage token={token} />} />
                    <Route path="/landing-page" element={<LandingPage />} />
                    <Route
                        path="/login"
                        element={<LogIn setToken={setToken} token={token} />}
                    />
                    <Route path="/register" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword token={token} />}
                    />
                    <Route
                        path="/reset-password/:resetPwdToken"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/home"
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
                            <Protected token={token} setToken={setToken}>
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
                                <AccountPage
                                    token={token}
                                    setToken={setToken}
                                />
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
