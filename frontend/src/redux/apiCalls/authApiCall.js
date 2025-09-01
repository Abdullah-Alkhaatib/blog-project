import {authActions} from "../slices/authSlices";
import axios from "axios";
import {toast} from "react-toastify";

// Login user
export function loginUser(user){
    return async (dispatch) => {
        try {
            // const response = await fetch("http://localhost:8000/api/auth/login", {
            //     method: "POST",
            //     body: JSON.stringify(user), // يحول الاوبجكت ل جيسون (نص)
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            // });
            // const data = await response.json();

            const {data} = await axios.post("http://localhost:8000/api/auth/login", user);
            dispatch(authActions.login(data)); // تسجيل دخول المستخدم
            localStorage.setItem("userInfo", JSON.stringify(data)); // حفظ بيانات المستخدم في التخزين المحلي
            
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Logout user
export function logoutUser(){
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
}


// Register user
export function registerUser(user){
    return async (dispatch) => {
        try {
            const {data} = await axios.post("http://localhost:8000/api/auth/register", user);
            dispatch(authActions.register(data.message)); 
            
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Verify email
export function verifyEmail(userId, token){
    return async (dispatch) => {
        try {
            await axios.get(`http://localhost:8000/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setIsEmailVerified());
        } catch (error) {
            // toast.error(error.response && error.response.data.message);
            console.log(error);
        }
    }
}