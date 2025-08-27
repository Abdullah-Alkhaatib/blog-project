import {postActions} from "../slices/postSlice";
import axios from "axios";
import {toast} from "react-toastify";

// Create comment
export function createComment(newComment){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.post("http://localhost:8000/api/comments", newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.addCommentToPost(data)); // إضافة التعليق الجديد إلى البوست الحالي
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Update comment
export function updateComment( commentId, comment){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.put(`http://localhost:8000/api/comments/${commentId}`, comment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.updateCommentPost(data)); // تحديث التعليق في البوست الحالي
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Delete comment
export function deleteComment(commentId){
    return async (dispatch, getState) => {
        try {
            await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.deleteCommentFromPost(commentId)); // حذف التعليق من البوست الحالي
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}