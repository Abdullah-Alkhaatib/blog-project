import {profileActions} from "../slices/profileSlice";
import axios from "axios";
import {toast} from "react-toastify";
import {authActions} from "../slices/authSlices";

// Get user profile
export function getUserProfile(userId){
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Upload profile photo
export function uploadProfilePhoto(newPhoto){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.post(`http://localhost:8000/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("token")}`
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data" // مهم عشان يرفع الصور والفيديوات والملفات
                }
            });

            dispatch(profileActions.setProfilePhoto(data.profilePhoto)); // data => اللي ب res.status(200)
            dispatch(authActions.setUserPhoto(data.profilePhoto));

            toast.success(data.message);

            // modify the user in local storage with new photo
            const user = JSON.parse(localStorage.getItem("userInfo")); // تخزين معلومات المستخدم
            user.profilePhoto = data?.profilePhoto; // تحديث صورة الملف الشخصي
            localStorage.setItem("userInfo", JSON.stringify(user)); // حفظ معلومات المستخدم

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}



// Update profile
export function updateProfile(userId, profile){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.put(`http://localhost:8000/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.updateProfile(data.profile)); // data => اللي ب res.status(200)
            dispatch(authActions.setUsername(data.username));
            dispatch(authActions.setBio(data.bio));

            // modify the user in local storage with new username
            const user = JSON.parse(localStorage.getItem("userInfo")); // تخزين معلومات المستخدم
            user.username = data?.username; // تحديث اسم المستخدم
            user.bio = data?.bio; // تحديث السيرة الذاتية
            localStorage.setItem("userInfo", JSON.stringify(user)); // حفظ معلومات المستخدم

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Delete profile
export function deleteProfile(userId){
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading());

            const {data} = await axios.delete(`http://localhost:8000/api/users/profile/${userId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.setIsProfileDeleted()); // تعيين حالة الحذف
            toast.success(data?.message);
            setTimeout(() => {
                dispatch(profileActions.clearIsProfileDeleted());
            }, 2000);

            // remove user from local storage
            // localStorage.removeItem("userInfo");

        } catch (error) {
            toast.error(error.response && error.response.data.message);
            dispatch(profileActions.clearLoading());
        }
    }
}


// Get users count (for admin dashboard)
export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/users/count`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.setUserCount(data));

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Get all users profile (for admin dashboard)
export function getAllUsersProfile() {
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/users/profile`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.setProfiles(data));

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}