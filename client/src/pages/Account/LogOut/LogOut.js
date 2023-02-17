import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api";

const LogOut = ({ setToken }) => {
	const LogoutButton = () => {
		const navigate = useNavigate();

		function logout(event) {
			event.preventDefault();

			fetch(`${apiBaseUrl}/users/logout`, {
				method: "POST",
				credentials: "include",
			})
				.then((res) => res.json())
				.then(() => {
					navigate("/login"); // LogoutPage will delete Token and navigate to /login
				});
		}
		return (
			<button className="blue-button" onClick={logout}>
				Logout
			</button>
		);
	};

	useEffect(() => {
		setToken(null);
	}, []);

	return (
		<>
			<LogoutButton />
		</>
	);
};

export default LogOut;
