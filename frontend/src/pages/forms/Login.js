import {Link} from "react-router-dom"
import "./form.css"
import { useState } from "react";
import {toast} from "react-toastify";
// import {toast} from "react-hot-toast"
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch(); // Initialize dispatch

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        // console.log({ email, password });

        // Dispatch login action
        dispatch(loginUser({ email, password }));

    }

    return(
        <section className="form-container">

            <h1 className="form-title">Login to your account</h1>

            {/* <ToastContainer position="top-right" autoClose={3000} /> */}

            <form className="form" onSubmit={formSubmitHandler}>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input 
                    className="form-input" 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input 
                    className="form-input" 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="form-btn" type="submit">
                    Login
                </button>
            </form>

            <div className="form-footer">
                Did you forget your password? 
                <Link to="/forgot-password">Forgot Password</Link>
            </div>

        </section>
    )
}