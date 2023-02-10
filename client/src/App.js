import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProfile from "./pages/Account/EditProfile/EditProfile";
import LogIn from "./pages/Account/LogIn/LogIn";
import SignUp from "./pages/Account/SignUp/SignUp";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<SignUp />
				<EditProfile />
				<LogIn />
			</BrowserRouter>
		</div>
	);
}

export default App;
