import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css"
import swal from "sweetalert"; //npm install sweetalert
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";

export default function UsersTable(){

    const dispatch = useDispatch();
    const { profiles, isProfileDeleted } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, [isProfileDeleted, dispatch]); // لو اتـم حذف ملف شخصي، نعيد جلب كل الملفات الشخصية

    // Delete user handler
    const deleteUserHandler = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((isOk) => {
            if (isOk) {
                // Dispatch delete user action
                dispatch(deleteProfile(userId));
            }
        });
    }

    return (
        <div className="table-container">

            <AdminSidebar />

            <div className="table-wrapper">

                <h1 className="table-title">Users</h1>
                <table className="table">

                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {profiles.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td> {/* Count */}
                                <td>
                                    <div className="table-image">
                                        <img src={item.profilePhoto?.url}
                                        alt="" 
                                        className="table-user-image"
                                        />
                                        <span className="table-username">
                                            {item.username}
                                            </span>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td> {/* Actions */}
                                    <div className="table-button-group">
                                    <button>
                                            <Link to={`/profile/${item._id}`}>
                                                View Profile
                                            </Link>
                                        </button>
                                        <button onClick={() => deleteUserHandler(item._id)  }>Delete User</button>
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