import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css"
import swal from "sweetalert"; //npm install sweetalert
// import {posts} from "../../dummyData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";

export default function PostsTable(){

    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.post);

    // Delete post handler
    const deletePostHandler = (postId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((isOk) => {
            if (isOk) {
                dispatch(deletePost(postId));
            }
        });
    }

    useEffect(() => {
        dispatch(getAllPosts()); // fetch all posts
    }, [dispatch]);

    return (
        <div className="table-container">

            <AdminSidebar />

            <div className="table-wrapper">

                <h1 className="table-title">Posts</h1>
                <table className="table">

                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Post Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td> {/* Count */}
                                <td>
                                    <div className="table-image">
                                        <img src={item.user.profilePhoto?.url}
                                        alt="" 
                                        className="table-user-image"
                                        />
                                        <span className="table-username">
                                            {item.user.username}
                                        </span>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td> {/* Actions */}
                                    <div className="table-button-group">
                                    <button>
                                            <Link to={`/posts/details/${item._id}`}>
                                                View Post
                                            </Link>
                                        </button>
                                        <button 
                                        onClick={() => deletePostHandler(item._id)}>
                                            Delete Post
                                            </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}