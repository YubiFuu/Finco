import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api";

import ProfileInfo from "./ProfileInfo";

const ProfilePage = ({ token }) => {
	const [stays, setStays] = useState([]);
	const [errorMessage, setErrorMessage] = useState([]);

	useEffect(() => {
		fetch(`${apiBaseUrl}/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(({ status, result: staysResult, error }) => {
				if (status === "ok") {
					setStays(staysResult);
				} else {
					setErrorMessage(error.message);
				}
			});
	}, []);
	return (
		<>
			<h1>Profile</h1>
			<ProfileInfo token={token} />
		</>
	);
};

export default ProfilePage;
