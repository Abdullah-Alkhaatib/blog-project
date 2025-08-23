import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import "./profile.css";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "../posts-page/UpdateProfileModal";

export default function Profile() {

    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(!file) return toast.warning("There is no file!");
    };

    // Delete account handler
    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                swal("Account has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your account is safe!");
            }
        });
    }

    return (
        <section className="profile">

            <div className="profile-header">
                
                <div className="profile-image-wrapper">
                    <img 
                    src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"} 
                    alt="Profile"
                    className="profile-image" 
                    />

                    <form onSubmit={formSubmitHandler}>
                        <ToastContainer />
                        <abbr title="choose profile photo">
                            <label 
                            htmlFor="file" 
                            className="bi bi-camera-fill upload-profile-photo-icon">
                            </label>
                        </abbr>
                        <input 
                        style={{display: "none"}} 
                        type="file" 
                        id="file" 
                        name="file" 
                        onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit" className="upload-profile-photo-btn">Upload</button>
                    </form>

                </div>

                <h1 className="profile-username">Abdullah Mohammad</h1>
                <p className="profile-bio">hello my name is Abdullah Mohammad, i am a web developer.</p>

                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>8/23/2025</span>
                </div>

                <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>

            </div>

            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">Abdullah Posts</h2>
                <PostList posts={posts} />
            </div>

            <button className="delete-account-btn" onClick={deleteAccountHandler}>
                Delete Your Account
            </button>

            {updateProfile && (<UpdateProfileModal setUpdateProfile={setUpdateProfile} />)}

        </section>
    );
}
