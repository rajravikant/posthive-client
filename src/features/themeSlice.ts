import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            // state.theme = state.theme === "light" ? "dark" : "light";
            if (state.theme === "light") {
                state.theme = "dark";
                document.body.classList.add("dark");
            } else {
                state.theme = "light";
                document.body.classList.remove("dark");

            }
        }

    },
    
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;