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