import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LangState {
    lang: "en" | "zh"
}

const initialState: LangState = {
    lang: "en"
};

const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLang: (state: LangState, action: PayloadAction<"en" | "zh">) => {
            state.lang = action.payload;
        },
    },
});

export const {
   setLang
} = langSlice.actions;
export default langSlice.reducer;
