import "./updateProfileModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

export default function UpdateProfileModal({setUpdateProfile, profile}) {

    const dispatch = useDispatch();

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [newPassword, setNewPassword] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        const updatedUser = {username, bio}

        if(newPassword.trim() !== ""){
            updatedUser.password = newPassword; // اضافة كلمة المرور
        }

        // console.log(updatedUser);

        dispatch(updateProfile(profile?._id, updatedUser));
        setUpdateProfile(false);
    }; 

    return (
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <i onClick={() => setUpdateProfile(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
                </abbr>

                <h1 className="update-profile-title">Update Your Profile</h1>
                <input 
                type="text" 
                placeholder="Username"
                className="update-profile-input" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                className="update-profile-input"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                >
                </input>
                <input 
                type="password" 
                className="update-profile-input" 
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="update-profile-btn" type="submit">Update Profile</button>
            </form>
        </div>
    );
}