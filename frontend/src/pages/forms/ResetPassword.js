import "./form.css"
import { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

export default function ResetPassword(){

    const [password, setPassword] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(password.trim() === "") return toast.error("Password is required");

        console.log({ password });
    }

    return(
        <section className="form-container">

            <h1 className="form-title">Reset your password</h1>

            <ToastContainer position="top-right" autoClose={3000} />

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

        </section>
    )
}