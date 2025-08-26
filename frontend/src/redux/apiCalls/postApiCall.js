import {postActions} from "../slices/postSlice";
import axios from "axios";
import {toast} from "react-toastify";

// Fetch posts based on page number
export function fetchPosts(pageNumber){
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Get posts count
export function getPostsCount(){
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/posts/count`);
            dispatch(postActions.setPostsCount(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Fetch posts based on Category
export function fetchPostsBasedOnCategory(category){
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/posts?category=${category}`);
            dispatch(postActions.setPostsCat(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}

// Create a new post
export function createNewPost(newPost){
    return async (dispatch, getState) => { // getState => عشان اليوزر اللي بقدر يحط بوست بده token
        try {

            dispatch(postActions.setLoading()); // ابدأ التحميل

            await axios.post(`http://localhost:8000/api/posts`, newPost, { // ارسل البيانات
                headers: { 
                    Authorization: `Bearer ${getState().auth.user.token}`, // توكن المستخدم
                    "Content-Type": "multipart/form-data" // نوع المحتوى
                }
            });

            dispatch(postActions.setPostCreated()); // تم إنشاء المنشور

            setTimeout(() => { // بعد ثانيتين بتصفر الفلاج النجاخ عشان الرساله تختفي / ترجع الحالة الطبيعيه
                dispatch(postActions.clearIsPostCreated()); 
            }, 2000);
        } catch (error) {
            toast.error(error.response && error.response.data.message);
            dispatch(postActions.clearLoading()); // إيقاف التحميل في حالة الخطأ
        }
    }
}


// Fetch a single post by its ID
export function fetchSinglePost(postId){
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/posts/${postId}`);
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Toggle Like a post
export function toggleLikePost(postId){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.put(`http://localhost:8000/api/posts/like/${postId}`, {}, { // في اكسيوس لما نكتب البوت البارميتر الثاني لازم يكون للبيانات لانه ما عنا بيانات هنا بنخليه اوبجيكت فارغه
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(postActions.setLike(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Update post image
export function updatePostImage(postId, newImage){
    return async (dispatch, getState) => {
        try {
            await axios.put(`http://localhost:8000/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                    ,"Content-Type": "multipart/form-data" // لازم عشان الصورة
                }
            });
            toast.success("New post image uploaded successfully");
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Update post
export function updatePost(postId, newPost){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.put(`http://localhost:8000/api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}


// Delete post
export function deletePost(postId){
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(postActions.deletePost(data.postId));
            toast.success(data.message); //تبعت الباكند
        } catch (error) {
            toast.error(error.response && error.response.data.message);
        }
    }
}