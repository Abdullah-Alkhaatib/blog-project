import { useState } from "react";
import "./create-post.css";
import {toast, ToastContainer} from "react-toastify"; // index.js

export default function CreatePost(){
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        if(title.trim() === "") return toast.error("Post title is required");
        if(category.trim() === "") return toast.error("Post category is required");
        if(description.trim() === "") return toast.error("Post description is required");
        if(file === null) return toast.error("Post file is required");

        // console.log({title, category, description, file});

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", file); // image => من الباكند هيك انا مسميها

        // @TODO - send form data to server
    }

    return(
        <section className="create-post">
            <ToastContainer position="top-right" autoClose={3000} theme="light" />
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form onSubmit={formSubmitHandler} className="create-post-form">
                <input 
                type="text" 
                placeholder="Post Title" 
                className="create-post-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

                <select 
                className="create-post-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">Select a category</option>
                    <option value="music">Music</option>
                    <option value="coffee">Coffee</option>
                </select>

                <textarea 
                className="create-post-textarea" 
                rows="5" placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <input 
                type="file" 
                name="file" 
                id="file" 
                className="create-post-upload" 
                onChange={(e) => setFile(e.target.files[0])}
                />

                <button type="submit" className="create-post-btn">Create</button>

            </form>
        </section>
    )
}