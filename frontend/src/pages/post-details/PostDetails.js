import {Link, useParams, useNavigate} from "react-router-dom";
// import {posts} from "../../dummyData";
import "./postDetails.css"
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert"; //npm install sweetalert
import UpdatePostModal from "./UpdatePostModal";
import {useDispatch, useSelector} from "react-redux";
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";

export default function PostDetails() {

    const dispatch = useDispatch();
    const {post} = useSelector(state => state.post);
    const {user} = useSelector(state => state.auth);

    // const params = useParams();
    // console.log(params); // {id: '1'}

    const {id} = useParams();

    const [file, setFile] = useState(null);
    const [updatePost, setUpdatePost] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchSinglePost(id));
    }, [dispatch, id]);

    // Update image submit handler
    const updateImageSubmitHandler = (e) => {
        e.preventDefault();
        if(file === null) return toast.warning("Please select an image");

        // console.log("Update image form submitted");

        const formData = new FormData();
        formData.append("image", file);

        dispatch(updatePostImage(post?._id, formData));
    }

    const navigate = useNavigate();

    // Delete post handler
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((isOk) => {
            if (isOk) {
                dispatch(deletePost(post?._id));
                // navigate(`/profile/${user?._id}`);
                navigate(-1); // ارجع للصفحة السابقة
            }
        });
    }

    if(!post){
        return(
            <section className="post-details">
                <p>Loading post details...</p>
            </section>
        )
    }

    return (
        <section className="post-details">
            {/* <ToastContainer theme="light" position="top-right" /> */}
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : post?.image.url} alt="" className="post-details-image" />

                {user?._id === post?.user?._id && (
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
                )}

            </div>

            <h1 className="post-details-title">{post?.title}</h1>

            <div className="post-details-user-info">
                <img src={post?.user?.profilePhoto?.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>

            <p className="post-details-description">
                {post?.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="post-details-icon-wrapper">
                <div>
                    {user && (
                        <i 
                        onClick={() => dispatch(toggleLikePost(post?._id))}
                        className={post?.likes.includes(user?._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}
                        ></i>
                    )}
                    <small>{post?.likes.length} likes</small>
                </div>
 
                {user?._id === post?.user?._id && (
                    <div>
                        <i onClick={() => setUpdatePost(true)} className="bi bi-pencil-square"></i>
                        <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                    </div>
                )}

            </div>

            {user ? <AddComment postId={post?._id} />
             : 
            <p className="post-details-info-write">to write a comment you should login first</p>}

            <CommentList comments = {post?.comments} />

            {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}

        </section>
    );
}