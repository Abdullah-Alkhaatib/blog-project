import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postsCat: [],
        loading: false,
        isPostCreated: false,
        post: null
    },
    reducers: {
        setPosts(state, action){
            state.posts = action.payload;
        },
        setPostsCount(state, action){
            state.postsCount = action.payload;
        },
        setPostsCat(state, action){
            state.postsCat = action.payload;
        },
        setLoading(state){
            state.loading = true;
        },
        clearLoading(state){
            state.loading = false;
        },
        setPostCreated(state){
            state.isPostCreated = true;
            state.loading = false;
        },
        clearIsPostCreated(state){
            state.isPostCreated = false;
        },
        setPost(state, action) {
            state.post = action.payload;
        },
        setLike(state, action){
            state.post.likes = action.payload.likes;
        },
        deletePost(state, action){
            state.posts = state.posts.filter(p => p._id !== action.payload); // حذف البوست من القائمة
        },
        addCommentToPost(state, action){
            // action.payload => نيو بوست نضيفه على كومينتس اراي
            state.post.comments.push(action.payload); // إضافة التعليق إلى البوست الحالي
        },
        updateCommentPost(state, action){
            state.post.comments = state.post.comments.map(comment => 
                comment._id === action.payload._id ? action.payload : comment
            )
        },
        deleteCommentFromPost(state, action){
            state.post.comments = state.post.comments.filter(comment => comment._id !== action.payload);
        }
    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer };
