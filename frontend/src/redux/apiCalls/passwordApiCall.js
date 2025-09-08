import { passwordActions } from "../slices/passwordSlice";
import axios from "axios";
import {toast} from "react-toastify";
// import {toast} from "react-hot-toast"

// Forgot password
export function forgotPassword(email){
    return async () => {
        try {
            const {data} = await axios.post("http://localhost:8000/api/password/reset-password-link", { email });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


// Get reset password
export function getResetPassword(userId, token){
    return async (dispatch) => {
        try {
            await axios.get(`http://localhost:8000/api/password/reset-password/${userId}/${token}`);
        } catch (error) {
            console.log(error);
            dispatch(passwordActions.setError());
        }
    }
}


// Reset the password
export function resetPassword(newPassword, user){
    return async () => {
        try {
            const {data} = await axios.post(`http://localhost:8000/api/password/reset-password/${user.userId}/${user.token}`, { 
                password: newPassword
             });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
