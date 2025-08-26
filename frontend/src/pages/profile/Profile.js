import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import "./profile.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "../posts-page/UpdateProfileModal";
import {useDispatch, useSelector} from "react-redux";
import { getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useParams } from "react-router-dom";

export default function Profile() {

    const dispatch = useDispatch();
    const {profile} = useSelector(state => state.profile);

    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false); // ⬅️ للتحكم بالصورة الكبيرة

    const { id } = useParams();
    useEffect(() => {
        dispatch(getUserProfile(id))
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(!file) return toast.warning("There is no file!");

        console.log("image uploaded");

        const formData = new FormData();
        formData.append("image", file);

        dispatch(uploadProfilePhoto(formData));
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
                    src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} 
                    alt="Profile"
                    className="profile-image"
                    onClick={() => setIsImageOpen(true)} // ⬅️ فتح الصورة الكبيرة
                    />

                    <form onSubmit={formSubmitHandler}>
                        {/* <ToastContainer autoClose={3000} position="top-center" /> */}
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

                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">{profile?.bio}</p>

                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>
                        {new Date(profile?.createdAt).toLocaleDateString()} {/* بعمل فورمات للتاريخ */}
                    </span>
                </div>

                <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>

            </div>

            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
                <PostList posts={posts} />
            </div>

            <button className="delete-account-btn" onClick={deleteAccountHandler}>
                Delete Your Account
            </button>

            {updateProfile && (
                <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />
            )}

             {/* ✅ المودال تبع الصورة */}
            {isImageOpen && (
                <div className="image-modal-overlay" onClick={() => setIsImageOpen(false)}>
                    <img 
                        src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} 
                        alt="Profile Large" 
                        className="image-modal" 
                    />
                </div>
            )}

        </section>
    );
}
