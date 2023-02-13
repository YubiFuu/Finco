import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api";
import Button from "../../../components/Button/Button";
import { makeFormData } from "../../../utils/formData";
import "./EditProfile.css";

const EditProfile = ({ token, profileInfo, onDone, onCancel }) => {
	// const [firstName, setFirstName] = useState(profileInfo.firstName);
	// const [lastName, setLastName] = useState(profileInfo.lastName);
	// const [email, setEmail] = useState(profileInfo.email);
	// const [bio, setBio] = useState(profileInfo.bio);
	const [cardNumber, setCardNumber] = useState("profileInfo.cardNumber");
	const [profilePicturePreview, setProfilePicturePreview] = useState(
		`${apiBaseUrl}/img/${"profileInfo.profilePicture"}`
	);
	const [profilePicture, setProfilePicture] = useState(null);

	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!profilePicture) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(profilePicture);
		reader.onloadend = function () {
			const base64data = reader.result;
			setProfilePicturePreview(base64data);
		};
	}, [profilePicture]);

	const editProfile = (event) => {
		event.preventDefault();

		const formData = makeFormData({
			cardNumber,
			// firstName,
			// lastName,
			// email,
			// bio,
			profilePicture,
		});

		fetch(`${apiBaseUrl}/users/profile`, {
			method: "PUT",
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		})
			.then((res) => res.json())
			.then(({ status, result, error }) => {
				if (status === "ok") {
					console.log(result);
					onDone({ ...profileInfo, ...result });
				} else {
					console.log(error);
					setErrorMessage("Error editing profile, try again later");
				}
			})
			.catch((error) => {
				console.log(error);
				setErrorMessage("Error editing profile, try again later");
			});
	};

	const cancelEdit = (event) => {
		event.preventDefault();
		return onCancel();
	};

	return (
		<div className="edit-profile">
			<h2>Edit your account</h2>
			<p>Profile picture</p>
			<img src={profilePicturePreview} alt="profile-picture" />
			<input
				type="file"
				onChange={(e) => setProfilePicture(e.target.files[0])}
			/>
			<div>📸</div>
			<input
				className="input-form"
				type="text"
				placeholder="Card number"
				onChange={(e) => setCardNumber(e.target.value)}
			/>
			<div>
				<div>⚠</div>
				<div>
					<label htmlFor="limit">Monthly spending limit</label>
					<select id="limit" name="credit-limit">
						<option value="2000">2000</option>
						<option value="3000">3000</option>
						<option value="5000">5000</option>
						<option value="10000">10000</option>
					</select>
				</div>
			</div>
			<Button buttonName={"Save Changes"} function={editProfile}></Button>
			<Button buttonName={"Cancel"} function={cancelEdit}></Button>
		</div>
	);
};

export default EditProfile;
