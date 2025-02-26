// src/features/diagrams/hooks/useDiagramFetch.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { DiagramData } from "../types/diagramTypes";
import {
    setDiagramsAction,
    addDiagramAction,
    deleteDiagramAction,
    setLoadingAction,
    setErrorAction
} from "../../../app/store/actions/diagramActions";
import { useErrorHandler } from "../../../app/hooks/useErrorHandler";
import diagramService from "../../../infrastructure/api/diagramApi";
import { Diagram } from "../../../core/diagrams/entities/Diagram";
export const useDiagramFetch = () => {
    const dispatch = useAppDispatch();
    const { diagrams, loading, error } = useAppSelector(state => state.diagrams);
    const user = useAppSelector(state => state.user);
    const { handleError } = useErrorHandler();

    const fetchDiagrams = useCallback(async () => {
        dispatch(setLoadingAction(true));
        try {
            const data = await diagramService.getDiagramsByUserId(user._id);
            const diagramsData = data.map((diagram: Diagram) => 
                diagramService.transformToData(diagram, user._id, user.email)
            );
            dispatch(setDiagramsAction(diagramsData));
        } catch (error) {
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
        } finally {
            dispatch(setLoadingAction(false));
        }
    }, [user._id, dispatch]);

    const createDiagram = async (name: string): Promise<DiagramData> => {
        dispatch(setLoadingAction(true));
        try {
            const newDiagram = await diagramService.createDiagram(name, user._id);
            const diagramData = diagramService.transformToData(newDiagram, user._id, user.email);
            dispatch(addDiagramAction(diagramData));
            return diagramData;
        } catch (error) {
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
            throw appError;
        } finally {
            dispatch(setLoadingAction(false));
        }
    };

    const deleteDiagramById = async (id: string): Promise<void> => {
        dispatch(setLoadingAction(true));
        try {
            await diagramService.deleteDiagram(id, user._id);
            dispatch(deleteDiagramAction(id));
        } catch (error) {
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
            throw appError;
        } finally {
            dispatch(setLoadingAction(false));
        }
    };

    return {
        diagrams,
        loading,
        error,
        createDiagram,
        deleteDiagram: deleteDiagramById,
        refreshDiagrams: fetchDiagrams
    };
};