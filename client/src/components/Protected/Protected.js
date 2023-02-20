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

		fetch(`${apiBaseUrl}/api/v1/users/refresh-token`, {
			method: "POST",
			credentials: "include",
		})
			.then((res) => res.json())
			.then(({ status, result }) => {
				setLoading(false);
				if (status === "ok") {
					setToken(result.accessToken);
				}
			});
	}, [token, setToken]);

	if (loading && !token) {
		return <h1>Loading...</h1>;
	} else if (!loading && !token) {
		return <Navigate to="/landing-page" />;
	} else {
		return <>{children}</>;
	}
};

export default Protected;
