import { createSlice } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: {},
        loading: true,
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setLogout: (state) => {
            state.user = {};
            state.loading = false
        },
    },
});
export const { setLogin, setLogout } = loginSlice.actions;

export default loginSlice.reducer