import {Link, useNavigate} from "react-router-dom"
import "./form.css"
import { useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

export default function Register(){

    const dispatch = useDispatch();
    const { registerMessage } = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(username.trim() === "") return toast.error("Username is required");
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        // console.log({ username, email, password });

        dispatch(registerUser({ username, email, password }));
    }

    const navigate = useNavigate();

    if(registerMessage){
        swal({
            title: registerMessage,
            icon: "success",
            // timer: 3000
        }).then(isOk => {
            if(isOk){
                // go to login page
                navigate("/login");
            }
        })
    }

    return(
        <section className="form-container">

            <h1 className="form-title">Create new account</h1>

            <ToastContainer position="top-right" autoClose={3000} />

            <form className="form" onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input 
                    className="form-input" 
                    type="text" 
                    id="username" 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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
                    Register
                </button>
            </form>

            <div className="form-footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>

        </section>
    )
}