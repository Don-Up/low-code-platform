import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Comp} from "@/app/components/Canvas/components/type";

interface ComponentState {
    components: Comp[];
    selectedComponentId: string | null;
}

const initialState: ComponentState = {
    components: [],
    selectedComponentId: null
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
    },
});

export const { setComponents, addComponent, clearComponents, setSelectComponentId, updateComponent, swapComponent, removeComponent } = compSlice.actions;
export default compSlice.reducer;
