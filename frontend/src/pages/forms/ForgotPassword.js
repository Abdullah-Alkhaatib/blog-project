import "./form.css"
import { useState } from "react";
import {toast} from "react-toastify";

export default function ForgotPassword(){

    const [email, setEmail] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(email.trim() === "") return toast.error("Email is required");

        console.log({ email });
    }

    return(
        <section className="form-container">

            <h1 className="form-title">Forget Password</h1>

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

                <button className="form-btn" type="submit">
                    submit
                </button>
            </form>

        </section>
    )
}