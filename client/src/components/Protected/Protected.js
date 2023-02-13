import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";

const Protected = ({ token, setToken, children }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (token) {
			setLoading(true);
			return;
		}

		fetch(`${apiBaseUrl}/users/refresh-token`, {
			method: "POST",
			credentials: "include", // here: take refresh token from httpOnly secure cookie and send it
		})
			.then((res) => res.json())
			.then(({ status, result }) => {
				setLoading(false);
				if (status === "ok") {
					setToken(result.accessToken);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/*
    loading & no token  --> loading indicator case
    loading & token  --> XXX - invalid case
    not loading & no token --> Login
    not loading & token --> success, logged in again
  */

	if (loading && !token) {
		return <h1>Loading...</h1>; // can be replaced with animation for example
	} else if (!loading && !token) {
		return <Navigate to="/login" />;
	} else {
		return <>{children}</>;
	}
};

export default Protected;
