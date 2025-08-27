import { useState } from "react";
import "./comment-list.css"
import swal from "sweetalert"; //npm install sweetalert
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment"; // npm i react-moment
import {useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

export default function CommentList({ comments }) {

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const [updateComment, setUpdateComment] = useState(false);
    const [commentForUpdate, setCommentForUpdate] = useState(null);

    // Update comment handler
    const updateCommentHandler = (comment) => {
        setCommentForUpdate(comment); 
        setUpdateComment(true); // رح يفتح المودال
    }

    // Delete comment handler
    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((isOk) => {
            if (isOk) {
                // Call delete comment API
                dispatch(deleteComment(commentId)); 
            } 
        });
    }

    return (
        <div className="comment-list">
            <h4 className="comment-list-count">{comments?.length || 0} Comments</h4>
            {comments?.map(comment => (
                <div key={comment._id} className="comment-item">

                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            {comment.username}
                        </div>
                        <div className="comment-item-time">
                            <Moment fromNow ago>
                                {comment.createdAt}
                            </Moment>{" "}
                            ago
                        </div>
                    </div>

                    <p className="comment-item-text">
                        {comment.text}
                    </p>

                    {user?._id === comment.user && (
                        <div className="comment-item-icon-wrapper">

                            <i 
                            onClick={() => updateCommentHandler(comment)} 
                            className="bi bi-pencil-square"
                            >

                            </i>
                            <i
                            onClick={() => deleteCommentHandler(comment?._id)} 
                            className="bi bi-trash-fill"
                            >
                            </i>

                        </div>
                    )}

                </div>
            ))}

            { updateComment && (
                <UpdateCommentModal 
                commentForUpdate={commentForUpdate} 
                setUpdateComment={setUpdateComment} 
                />
            )}

        </div>
    );
}