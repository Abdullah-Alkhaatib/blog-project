import { useState } from "react";
import {toast} from "react-toastify";

export default function AddCategoryForm(){

    const [title, setTitle] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(!title.trim()) return toast.error("Category title is required");

        console.log({title});
    };

    return(
        <div className="add-category">

            <h6 className="add-category-title">Add New Category</h6>

            <form onSubmit={formSubmitHandler}>
                {/* <ToastContainer autoClose={3000} theme="light" position="top-right" /> */}
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input 
                    type="text" 
                    id="title" 
                    placeholder="Enter category title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    // required 
                    />
                </div>
                <button className="add-category-btn" type="submit">Add</button>
            </form>

        </div>
    )
}