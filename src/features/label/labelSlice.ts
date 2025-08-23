import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LabelState {
    id: number | null
}

const initialState: LabelState = {
    id: null,
};

export const labelSlice = createSlice({
    name: "label",
    initialState,
    reducers: {
        setLabelId: (state, action: PayloadAction<number | null>) => {
            state.id = action.payload
        },
        clearLabelId: (state) => {
            state.id = null;
        }
    }
});

export default labelSlice.reducer;
export const { setLabelId, clearLabelId } = labelSlice.actions;