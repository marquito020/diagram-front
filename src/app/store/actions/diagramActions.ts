import { DiagramAction } from "../../../@types/store";
import { DiagramData } from "../../../features/diagrams/types/diagramTypes";
import {
    setDiagrams,
    addDiagram,
    updateDiagram,
    deleteDiagram,
    setLoading,
    setError,
    selectDiagram
} from "../slices/diagramSlice";
import { AppDispatch } from "..";

/**
 * Tipo para las funciones de acción tipadas que retornan una función de thunk
 */
type ActionCreator<P, R = DiagramAction> = (payload: P) => (dispatch: AppDispatch) => R;

/**
 * Acciones tipadas que utilizan DiagramAction para mejorar la seguridad de tipos
 * y seguir las mejores prácticas de Redux y TypeScript
 */

/**
 * Acción para establecer la lista completa de diagramas
 * @param diagrams Lista de diagramas a establecer
 */
export const setDiagramsAction: ActionCreator<DiagramData[]> = (diagrams) => 
    (dispatch) => {
        const action = setDiagrams(diagrams);
        dispatch(action);
        return {
            type: 'SET_DIAGRAMS',
            payload: diagrams
        };
    };

/**
 * Acción para añadir un nuevo diagrama
 * @param diagram Diagrama a añadir
 */
export const addDiagramAction: ActionCreator<DiagramData> = (diagram) => 
    (dispatch) => {
        const action = addDiagram(diagram);
        dispatch(action);
        return {
            type: 'ADD_DIAGRAM',
            payload: diagram
        };
    };

/**
 * Acción para actualizar un diagrama existente
 * @param diagram Diagrama actualizado
 */
export const updateDiagramAction: ActionCreator<DiagramData> = (diagram) => 
    (dispatch) => {
        const action = updateDiagram(diagram);
        dispatch(action);
        return {
            type: 'UPDATE_DIAGRAM',
            payload: diagram
        };
    };

/**
 * Acción para eliminar un diagrama por su ID
 * @param id ID del diagrama a eliminar
 */
export const deleteDiagramAction: ActionCreator<string> = (id) => 
    (dispatch) => {
        const action = deleteDiagram(id);
        dispatch(action);
        return {
            type: 'DELETE_DIAGRAM',
            payload: id
        };
    };

/**
 * Acción para establecer el estado de carga
 * @param loading Estado de carga a establecer
 */
export const setLoadingAction: ActionCreator<boolean> = (loading) => 
    (dispatch) => {
        const action = setLoading(loading);
        dispatch(action);
        return {
            type: 'SET_LOADING',
            payload: loading
        };
    };

/**
 * Acción para establecer un mensaje de error
 * @param error Mensaje de error o null para limpiar
 */
export const setErrorAction: ActionCreator<string | null> = (error) => 
    (dispatch) => {
        const action = setError(error);
        dispatch(action);
        return {
            type: 'SET_ERROR',
            payload: error
        };
    };

/**
 * Acción para seleccionar un diagrama
 * @param diagram Diagrama a seleccionar o null para deseleccionar
 */
export const selectDiagramAction: ActionCreator<DiagramData | null> = (diagram) => 
    (dispatch) => {
        const action = selectDiagram(diagram);
        dispatch(action);
        return {
            type: 'SELECT_DIAGRAM',
            payload: diagram
        };
    };
