import { useState } from "react";
import {toast} from "react-toastify";
// import {toast} from "react-hot-toast"
import {useDispatch} from "react-redux";
import {createCategory} from "../../redux/apiCalls/categoryApiCall";

export default function AddCategoryForm(){

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(!title.trim()) return toast.error("Category title is required");

        // console.log({title});

        dispatch(createCategory({title}));
        setTitle("");
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