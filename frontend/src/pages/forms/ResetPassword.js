import "./form.css"
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import { getResetPassword, resetPassword } from "../../redux/apiCalls/passwordApiCall";

export default function ResetPassword(){

    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.password);

    const [password, setPassword] = useState("");

    const {userId, token} = useParams();

    useEffect(() => {
        dispatch(getResetPassword( userId, token ));
    }, [userId, token]);

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(password.trim() === "") return toast.error("Password is required");

        // console.log({ password });

        dispatch(resetPassword(password, {userId, token})); // عشان data اللي ب resetPassword 
    }

    return(
        <section className="form-container">

            {isError ? <h1>Not Found</h1> 
            : 
            <>
            <h1 className="form-title">Reset Password</h1>

            {/* <ToastContainer position="top-right" autoClose={3000} /> */}

            <form className="form" onSubmit={formSubmitHandler}>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        New Password
                    </label>
                    <input 
                    className="form-input" 
                    type="password" 
                    id="password" 
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="form-btn" type="submit">
                    Submit
                </button>
            </form>
            </>
            }

        </section>
    )
}