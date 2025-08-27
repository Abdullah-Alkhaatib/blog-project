import "./update-post.css";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

export default function UpdatePostModal({setUpdatePost, post}) {

    const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.category);

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [category, setCategory] = useState(post.category);

    // Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(title.trim() === "") return toast.error("Post title is required");
        if(category.trim() === "") return toast.error("Post category is required");
        if(description.trim() === "") return toast.error("Post description is required");


        // console.log({title, description, category});

        dispatch(updatePost(post?._id, {title, category, description})); // عشان بدي ابعت ال id تبع البوست و البيانات الجديدة
        setUpdatePost(false); // close the modal
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <i onClick={() => setUpdatePost(false)} className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>

                <h1 className="update-post-title">Update Post</h1>
                <input 
                type="text" 
                className="update-post-input"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                className="update-post-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">Select A Category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <textarea 
                className="update-post-textarea"
                rows="5"
                placeholder="Enter post description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <button className="update-post-btn" type="submit">Update Post</button>
            </form>
        </div>
    );
}