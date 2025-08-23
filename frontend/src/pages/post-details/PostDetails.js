import {Link, useParams} from "react-router-dom";
import {posts} from "../../dummyData";
import "./postDetails.css"
import { useEffect, useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert"; //npm install sweetalert
import UpdatePostModal from "./UpdatePostModal";

export default function PostDetails() {

    // const params = useParams();
    // console.log(params); // {id: '1'}

    const {id} = useParams();
    const post = posts.find(p => p._id === parseInt(id));

    const [file, setFile] = useState(null);
    const [updatePost, setUpdatePost] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update image submit handler
    const updateImageSubmitHandler = (e) => {
        e.preventDefault();
        if(file === null) return toast.warning("Please select an image");

        // console.log("Update image form submitted");
    }

    // Delete post handler
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                swal("Post has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your post is safe!");
            }
        });
    }

    return (
        <section className="post-details">
            <ToastContainer theme="light" position="top-right" />
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : post.image} alt={post.title} className="post-details-image" />
                <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                    <label htmlFor="file" className="update-post-label">
                        <i className="bi bi-image-fill"></i>
                        Select new image
                    </label>
                    <input 
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }} type="file" name="file" id="file" />
                    <button type="submit">Upload</button>
                </form>
            </div>

            <h1 className="post-details-title">{post.title}</h1>

            <div className="post-details-user-info">
                <img src={post.user.image} alt={post.user.name} className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to="profile/1">{post.user.username}</Link>
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>

            <p className="post-details-description">
                {post.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="post-details-icon-wrapper">
                <div>
                    <i className="bi bi-hand-thumbs-up"></i>
                    <small>{post.likes.length} likes</small>
                </div>
                <div>
                    <i onClick={() => setUpdatePost(true)} className="bi bi-pencil-square"></i>
                    <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                </div>
            </div>

            <AddComment />

            <CommentList />

            {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}

        </section>
    );
}