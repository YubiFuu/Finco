import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api";
import EditProfile from "./EditProfile";

const ProfileInfo = ({ token }) => {
	const [editMode, setEditMode] = useState(false);
	const [profileInfo, setProfileInfo] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		fetch(`${apiBaseUrl}/users/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(({ status, result, error }) => {
				if (status === "ok") {
					setProfileInfo(result);
				} else {
					setErrorMessage(error.message);
				}
			});
	}, []);

	if (editMode) {
		return (
			<EditProfile
				token={token}
				profileInfo={profileInfo}
				onDone={(updatedProfileInfo) => {
					setProfileInfo(updatedProfileInfo);
					setEditMode(false);
				}}
				onCancel={() => {
					setEditMode(false);
				}}
			/>
		);
	} else if (errorMessage) {
		return <p className="error-message">{errorMessage}</p>;
	} else {
		return (
			<div className="profile-info-container">
				<div>
					<h2>
						{profileInfo.firstName} {profileInfo.lastName}
					</h2>
					<p>{profileInfo.bio}</p>
					<img
						className="user-profile-avatar"
						src={`${profileInfo.profilePicture}`}
						alt={`${profileInfo.firstName} bild`}
					/>
					<p>{profileInfo.email}</p>
					<p>{profileInfo.cardNumber}</p>
				</div>
				<button onClick={() => setEditMode(true)}>Edit</button>
			</div>
		);
	}
};

export default ProfileInfo;
