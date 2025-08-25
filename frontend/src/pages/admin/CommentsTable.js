import AdminSidebar from "./AdminSidebar";
import "./admin-table.css"
import swal from "sweetalert"; //npm install sweetalert

export default function CommentsTable(){

    // Delete comment handler
    const deleteCommentHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
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
        <div className="table-container">

            <AdminSidebar />

            <div className="table-wrapper">

                <h1 className="table-title">Comments</h1>
                <table className="table">

                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1,2,3].map((item) => (
                            <tr key={item}>
                                <td>{item}</td> {/* Count */}
                                <td>
                                    <div className="table-image">
                                        <img src="/images/user-avatar.png" 
                                        alt="" 
                                        className="table-user-image"
                                        />
                                        <span className="table-username">
                                            Abdullah Mohammed
                                        </span>
                                    </div>
                                </td>
                                <td>Thank you for this post</td>
                                <td> {/* Actions */}
                                    <div className="table-button-group">
                                        <button onClick={deleteCommentHandler}>Delete Comment</button>
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