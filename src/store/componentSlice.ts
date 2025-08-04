import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Comp} from "@/app/components/Canvas/components/type";

interface ComponentState {
    components: Comp[];
    selectedComponentId: string | null;
    isPreviewMode: boolean;
}

const initialState: ComponentState = {
    components: [],
    selectedComponentId: null,
    isPreviewMode: false,
};

const compSlice = createSlice({
    name: "comp",
    initialState,
    reducers: {
        setComponents: (state: ComponentState, action: PayloadAction<Comp[]>) => {
            state.components = action.payload;
        },
        addComponent: (state: ComponentState, action: PayloadAction<Comp>) => {
            state.components.push(action.payload);
        },
        updateComponent: (state: ComponentState, action: PayloadAction<Comp>) => {
            const index = state.components.findIndex((c) => c.id === state.selectedComponentId);
            if (index !== -1) {
                state.components[index] = action.payload;
            }
        },
        clearComponents: (state: ComponentState) => {
            state.components = [];
            state.selectedComponentId = null
        },
        setSelectComponentId: (state: ComponentState, action: PayloadAction<string | null>) => {
            state.selectedComponentId = action.payload;
        },
        swapComponent : (state: ComponentState, action: PayloadAction<{oldIndex: number, newIndex: number}>) => {
            const {oldIndex, newIndex} = action.payload;
            [state.components[oldIndex], state.components[newIndex]] = [state.components[newIndex], state.components[oldIndex]];
        },
        removeComponent: (state: ComponentState, action: PayloadAction<string>) => {
            state.components = state.components.filter((c) => c.id !== action.payload);
            state.selectedComponentId = null;
        },
        saveState: (state) => state, // 仅用于触发保存，无需修改状态
        loadState: (state, action: PayloadAction<Comp[]>) => {
            state.components = action.payload;
            state.selectedComponentId = null; // 重置选中状态
        },
        setPreviewMode: (state, action: PayloadAction<boolean>) => {
            state.isPreviewMode = action.payload;
        },
    },
});

export const { setComponents, addComponent, clearComponents, setSelectComponentId, updateComponent, swapComponent, removeComponent, saveState, loadState, setPreviewMode } = compSlice.actions;
export default compSlice.reducer;
