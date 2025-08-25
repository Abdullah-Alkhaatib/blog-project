import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null
    },
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setProfilePhoto(state, action) {
            state.profile.profilePhoto = action.payload; // تعيين الصورة الجديدة
        },
        updateProfile(state, action){
            state.profile = action.payload; // تعيين البيانات الجديدة
        }
    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };