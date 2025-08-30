import AdminSidebar from "./AdminSidebar";
import "./admin-table.css"
import swal from "sweetalert"; //npm install sweetalert
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { useEffect } from "react";

export default function CategoriesTable(){

    const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Delete category handler
    const deleteCategoryHandler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((isOk) => {
            if (isOk) {
                // Dispatch delete action
                dispatch(deleteCategory(categoryId));
            }
        });
    }

    return (
        <div className="table-container">

            <AdminSidebar />

            <div className="table-wrapper">

                <h1 className="table-title">Categories</h1>
                <table className="table">

                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Category Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td> {/* Count */}
                                <td>
                                    <b>{item.title}</b>
                                </td>
                                <td> {/* Actions */}
                                    <div className="table-button-group">
                                        <button onClick={() => deleteCategoryHandler(item._id)}>
                                            Delete Category</button>
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