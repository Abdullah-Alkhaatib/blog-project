import "./updateProfileModal.css";
import { useState } from "react";

const user = {
    username: "Abdullah Mohammad",
    bio: "Hello my name is abdullah"
}

export default function UpdateProfileModal({setUpdateProfile}) {

    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [password, setPassword] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        const updatedUser = {username, bio}

        if(password.trim() !== ""){
            updatedUser.password = password; // اضافة كلمة المرور
        }

        console.log(updatedUser);
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="update-profile-btn" type="submit">Update Profile</button>
            </form>
        </div>
    );
}