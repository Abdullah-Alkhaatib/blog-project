// write login register logout

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth", // اي اسم عادي
    initialState: {
        user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,

        registerMessage: null
    },
    reducers: {
        login(state, action){
            state.user = action.payload; // {id: 1, name: "John"}
        },
        logout(state){
            state.user = null;
        },
        register(state, action) {
            state.registerMessage = action.payload;
        },
        setUserPhoto(state, action) {
                state.user.profilePhoto = action.payload;
        },
        setUsername(state, action) {
            state.user.username = action.payload;
        },
        setBio(state, action) {
            state.user.bio = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };