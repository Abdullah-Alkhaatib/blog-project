import { Link } from "react-router-dom"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from "../../redux/apiCalls/authApiCall";

export default function HeaderRight({toggle, setToggle}) {

    const {user} = useSelector(state => state.auth); // Get user from auth state

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false); // ⬅️ للتحكم بالصورة الكبيرة

    const dispatch = useDispatch();

    const logoutHandler = () => {
        setDropdownOpen(false);
        dispatch(logoutUser());
        window.location.href = "/"; // Redirect to home page after logout
    };

    return (
        <div className="header-right">
            {user ? (
                <>
                    <div className="header-right-user-info">
                        <span onClick={() => setDropdownOpen(!dropdownOpen)} className="header-right-username">
                            {user?.username}
                        </span>
                        <img src={user?.profilePhoto.url}
                        alt="User"
                        className="header-right-user-photo"
                        onClick={() => setIsImageOpen(true)}
                        />

                        {dropdownOpen && (
                            <div className="header-right-dropdown">
                                <Link to={`/profile/${user?._id}`}
                                className="header-dropdown-item"
                                onClick={() => setDropdownOpen(false)}
                                >
                                    <i className="bi bi-file-person"></i>
                                    <span style={{fontSize: "16px"}}>Profile</span>
                                </Link>
                                <div onClick={logoutHandler} className="header-dropdown-item">
                                    <i className="bi bi-box-arrow-in-left"></i>
                                    <span style={{fontSize: "16px"}}>Logout</span>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* ✅ المودال لعرض الصورة الكبيرة */}
                    {isImageOpen && (
                        <div className="image-modal-overlay" onClick={() => setIsImageOpen(false)}>
                            <img 
                                src={user?.profilePhoto.url} 
                                alt="Profile Large" 
                                className="image-modal" 
                            />
                        </div>
                    )}
                </> 
                ) : (
                    <>
                        <Link to="/login" className="header-right-link">
                            <i className="bi bi-box-arrow-right"></i>
                                <span>Login</span>
                        </Link>
                        <Link to="/register" className="header-right-link">
                            <i className="bi bi-person-plus"></i>
                            <span>Register</span>
                        </Link>
                    </>
                    )
            }
        </div>
    )
}