import { useState } from "react";
import "./comment-list.css"
import swal from "sweetalert"; //npm install sweetalert
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment"; // npm i react-moment
import {useSelector } from "react-redux";

export default function CommentList({ comments }) {

    const {user} = useSelector(state => state.auth);

    const [updateComment, setUpdateComment] = useState(false);

    // Delete comment handler
    const deleteCommentHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                swal("Comment has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your comment is safe!");
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
                            <i onClick={() => setUpdateComment(true)} className="bi bi-pencil-square"></i>
                            <i onClick={deleteCommentHandler} className="bi bi-trash-fill"></i>
                        </div>
                    )}

                </div>
            ))}

            { updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment} />}

        </div>
    );
}