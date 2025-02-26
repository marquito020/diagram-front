import { DiagramAction } from "../../../@types/store";
import { DiagramData } from "../../../features/diagrams/types/diagramTypes";

export const setDiagramsAction = (diagrams: DiagramData[]): DiagramAction => ({
    type: 'SET_DIAGRAMS',
    payload: diagrams
});

export const addDiagramAction = (diagram: DiagramData): DiagramAction => ({
    type: 'ADD_DIAGRAM',
    payload: diagram
});

export const updateDiagramAction = (diagram: DiagramData): DiagramAction => ({
    type: 'UPDATE_DIAGRAM',
    payload: diagram
});

export const deleteDiagramAction = (id: string): DiagramAction => ({
    type: 'DELETE_DIAGRAM',
    payload: id
});

export const setLoadingAction = (loading: boolean): DiagramAction => ({
    type: 'SET_LOADING',
    payload: loading
});

export const setErrorAction = (error: string | null): DiagramAction => ({
    type: 'SET_ERROR',
    payload: error
});

export const selectDiagramAction = (diagram: DiagramData | null): DiagramAction => ({
    type: 'SELECT_DIAGRAM',
    payload: diagram
});
