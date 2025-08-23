import "./add-comment.css"
import { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

export default function AddComment() {

    const [text, setText] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(text.trim() === "") return toast.error("Please write something");

        console.log({text});

        setText("");
        // toast.success("Comment added successfully");
    }

    return (
        <form className="add-comment" onSubmit={formSubmitHandler}>
            <ToastContainer theme="light" position="top-right" />
            <input 
            type="text" 
            placeholder="Add a comment..." 
            className="add-comment-input" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-comment-btn">Comment</button>
        </form>
    );
}