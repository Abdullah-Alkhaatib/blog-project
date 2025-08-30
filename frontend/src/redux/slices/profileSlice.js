import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        isProfileDeleted: false,
        userCount: null,
        profiles: []
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
        },
        setLoading(state){
            state.loading = true; //نعرض "spinner" أو "جاري التحميل...".
        },
        clearLoading(state){
            state.loading = false; //بتوقف التحميل وتخلي القيمة false.
        },
        setIsProfileDeleted(state){
            state.isProfileDeleted = true; // "الملف الشخصي اتـم حذفه" (isProfileDeleted = true)
            state.loading = false; // إيقاف التحميل
        },
        clearIsProfileDeleted(state){
            state.isProfileDeleted = false; //يعني كأنك "مسحت" حالة الحذف عشان ما تضل موجودة لو رحت على صفحة ثانية أو عملت عملية جديدة
        },
        setUserCount(state, action) {
            state.userCount = action.payload;
        },
        setProfiles(state, action) {
            state.profiles = action.payload;
        },
    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };