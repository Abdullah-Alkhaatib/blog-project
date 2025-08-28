import { useEffect, useState } from "react";
// import PostList from "../../components/posts/PostList";
import "./profile.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "../posts-page/UpdateProfileModal";
import {useDispatch, useSelector} from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import {Oval} from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

export default function Profile() {

    const dispatch = useDispatch();
    const {profile, isProfileDeleted, loading} = useSelector(state => state.profile);
    const {user} = useSelector(state => state.auth);

    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false); // ⬅️ للتحكم بالصورة الكبيرة

    const { id } = useParams();
    useEffect(() => {
        dispatch(getUserProfile(id))
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    const navigate = useNavigate();
    useEffect(() => {
        if (isProfileDeleted) {
            // toast.success("Profile deleted successfully!");
            navigate("/");
        }
    }, [isProfileDeleted, navigate]);

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
        .then((isOk) => {
            if (isOk) {
                dispatch(deleteProfile(user?._id));
                dispatch(logoutUser()); // ⬅️ تسجيل خروج المستخدم بعد حذف الحساب
            } 
        });
    }

    if(loading){
        return (
            <div className="profile-loader">
                 <Oval
                 visible={true}
                 height={120}
                 width={120}
                 color="#000"
                 ariaLabel="oval-loading"
                 strokeWidth={3}
                 strokeWidthSecondary={3}
                 secondaryColor="gray"
                 />
            </div>
        )
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

                    { user?._id === profile?._id && (
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
                    )}

                </div>

                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">{profile?.bio}</p>

                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>
                        {new Date(profile?.createdAt).toLocaleDateString()} {/* بعمل فورمات للتاريخ */}
                    </span>
                </div>

                { user?._id === profile?._id && (
                    <button onClick={() => setUpdateProfile(true)} 
                    className="profile-update-btn"
                    >
                        <i className="bi bi-file-person-fill"></i>
                            Update Profile
                    </button>
                )}

            </div>

            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
                {/* <PostList posts={posts} /> */}
                { profile?.posts?.map( post => 
                    <PostItem 
                    key={post._id} 
                    post={post}
                    username={profile?.username}
                    userId={profile?._id}
                    />
                )}
            </div>

            {user?._id === profile?._id && (
                <button className="delete-account-btn" 
                onClick={deleteAccountHandler}
                >
                    Delete Your Account
                </button>
            )}

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
