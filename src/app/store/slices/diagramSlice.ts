import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiagramState } from '../../../@types/store';
import { DiagramData } from '../../../features/diagrams/types/diagramTypes';

const initialState: DiagramState = {
    diagrams: [],
    loading: false,
    error: null,
    selectedDiagram: null
};

const diagramSlice = createSlice({
    name: 'diagrams',
    initialState,
    reducers: {
        setDiagrams: (state, action: PayloadAction<DiagramData[]>) => {
            state.diagrams = action.payload;
        },
        addDiagram: (state, action: PayloadAction<DiagramData>) => {
            state.diagrams.push(action.payload);
        },
        updateDiagram: (state, action: PayloadAction<DiagramData>) => {
            const index = state.diagrams.findIndex(d => d._id === action.payload._id);
            if (index !== -1) {
                state.diagrams[index] = action.payload;
            }
        },
        deleteDiagram: (state, action: PayloadAction<string>) => {
            state.diagrams = state.diagrams.filter(d => d._id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        selectDiagram: (state, action: PayloadAction<DiagramData | null>) => {
            state.selectedDiagram = action.payload;
        }
    }
});

export const {
    setDiagrams,
    addDiagram,
    updateDiagram,
    deleteDiagram,
    setLoading,
    setError,
    selectDiagram
} = diagramSlice.actions;
export default diagramSlice.reducer;
