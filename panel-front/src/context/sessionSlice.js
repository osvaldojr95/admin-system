import { createSlice } from "@reduxjs/toolkit";

const headcrumbsInitialState = [{
    text: "Dashboard",
    nav: "/dashboard",
}];

export const sessionSlice = createSlice({
    name: "session",
    initialState: {
        headcrumbs: headcrumbsInitialState
    },
    reducers: {
        setHeadcrumbs: (state, { payload }) => {
            state.headcrumbs = [...headcrumbsInitialState, ...payload];
        },
        cleanHeadcrumbs: (state) => {
            state.headcrumbs = headcrumbsInitialState;
        },
    },
});

export const { setHeadcrumbs, cleanHeadcrumbs } = sessionSlice.actions;

export const selectHeadcrumbs = (state) => {
    return state.session.headcrumbs;
};

export default sessionSlice.reducer;