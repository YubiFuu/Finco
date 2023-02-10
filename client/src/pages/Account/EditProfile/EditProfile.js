import Button from "../../../components/Button/Button";
import "./EditProfile.css";

const EditProfile = () => {
	return (
		<div className="edit-profile">
			<h2>Edit your account</h2>
			<p>Profile picture</p>
			<img src="" alt="profile-picture" />
			<div>📸</div>
			<input type="text" placeholder="Card number" />
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
			<Button buttonName={"Save Changes"}></Button>
		</div>
	);
};

export default EditProfile;
