import { useState, useEffect } from "react";
import "./create-post.css";
import {toast} from "react-toastify"; // index.js
// import {toast} from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { createNewPost } from "../../redux/apiCalls/postApiCall";
import {RotatingLines} from "react-loader-spinner"; // npm install react-loader-spinner --save
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

export default function CreatePost(){

    const dispatch = useDispatch();
    const {isPostCreated, loading} = useSelector((state) => state.post);
    const {categories} = useSelector((state) => state.category);

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
        dispatch(createNewPost(formData));
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(isPostCreated){
            toast.success("Post created successfully");
            navigate("/"); // Redirect to home page
        }        
    }, [isPostCreated, navigate])

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return(
        <section className="create-post">
            {/* <ToastContainer position="top-right" autoClose={3000} theme="light" /> */}
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
                    {categories.map(category => (
                        <option key={category._id} value={category.title}>
                            {category.title}
                        </option>
                    ))}
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

                <button type="submit" className="create-post-btn">
                    {
                        loading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="40"
                                visible={true}
                            />
                        ) : "Create"
                    }
                </button>

            </form>
        </section>
    )
}