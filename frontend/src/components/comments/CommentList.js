import { useState } from "react";
import "./comment-list.css"
import swal from "sweetalert"; //npm install sweetalert
import UpdateCommentModal from "./UpdateCommentModal";

export default function CommentList() {

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
            <h4 className="comment-list-count">2 Comments</h4>
            {[1,2].map(comment => (
                <div key={comment} className="comment-item">

                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            Abdullah Mohammed
                        </div>
                        <div className="comment-item-time">
                            2 hours ago
                        </div>
                    </div>

                    <p className="comment-item-text">
                        hello this is amazing
                    </p>

                    <div className="comment-item-icon-wrapper">
                        <i onClick={() => setUpdateComment(true)} className="bi bi-pencil-square"></i>
                        <i onClick={deleteCommentHandler} className="bi bi-trash-fill"></i>
                    </div>
                </div>
            ))}

            { updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment} />}

        </div>
    );
}