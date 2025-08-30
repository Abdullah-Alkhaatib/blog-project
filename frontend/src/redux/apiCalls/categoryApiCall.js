import {categoryActions} from "../slices/categorySlice";
import axios from "axios";
import {toast} from "react-toastify";

// Fetch all categories
export function fetchCategories(){
    return async (dispatch) => {
        try {
            const {data} = await axios.get("http://localhost:8000/api/categories");
            dispatch(categoryActions.setCategories(data)); // تحديث قائمة الفئات

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Create a new category
export function createCategory(newCategory){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.post("http://localhost:8000/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(categoryActions.addCategory(data)); // إضافة الفئة الجديدة
            toast.success("Category created successfully");

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Delete a category
export function deleteCategory(categoryId){
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(categoryActions.deleteCategory(data.categoryId)); // حذف الفئة
            toast.success(data.message);

        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}