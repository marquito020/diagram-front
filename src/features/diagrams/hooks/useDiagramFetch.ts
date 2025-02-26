// src/features/diagrams/hooks/useDiagramFetch.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { DiagramApi } from "../../../infrastructure/api/diagramApi";
import { CreateDiagram } from "../../../core/diagrams/useCases/CreateDiagram";
import { DeleteDiagram } from "../../../core/diagrams/useCases/DeleteDiagram";
import { GetDiagramsByUserId } from "../../../core/diagrams/useCases/GetDiagramsByUserId";
import { DiagramData } from "../types/diagramTypes";
import {
    setDiagramsAction,
    addDiagramAction,
    deleteDiagramAction,
    setLoadingAction,
    setErrorAction
} from "../../../app/store/actions/diagramActions";

export const useDiagramFetch = () => {
    const dispatch = useAppDispatch();
    const { diagrams, loading, error } = useAppSelector(state => state.diagrams);
    const user = useAppSelector(state => state.user);

    const diagramApi = new DiagramApi();
    const getDiagramsUseCase = new GetDiagramsByUserId(diagramApi);
    const createDiagramUseCase = new CreateDiagram(diagramApi);
    const deleteDiagramUseCase = new DeleteDiagram(diagramApi);

    const fetchDiagrams = useCallback(async () => {
        dispatch(setLoadingAction(true));
        try {
            const data = await getDiagramsUseCase.execute(user._id);
            const diagramsData = data.map(diagram => ({
                ...diagram,
                anfitrion: {
                    firstName: diagram.anfitrion.firstName,
                    lastName: diagram.anfitrion.lastName,
                    _id: user._id,
                    email: user.email
                },
                participantes: diagram.participantes.map(p => ({
                    firstName: p.firstName,
                    lastName: p.lastName,
                    _id: user._id,
                    email: user.email
                })),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }));
            dispatch(setDiagramsAction(diagramsData));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al cargar los diagramas";
            dispatch(setErrorAction(errorMessage));
        } finally {
            dispatch(setLoadingAction(false));
        }
    }, [user._id, dispatch]);

    const createDiagram = async (name: string): Promise<DiagramData> => {
        dispatch(setLoadingAction(true));
        try {
            const newDiagram = await createDiagramUseCase.execute(name, user._id);
            const diagramData: DiagramData = {
                ...newDiagram,
                anfitrion: {
                    firstName: newDiagram.anfitrion.firstName,
                    lastName: newDiagram.anfitrion.lastName,
                    _id: user._id,
                    email: user.email
                },
                participantes: newDiagram.participantes.map(p => ({
                    firstName: p.firstName,
                    lastName: p.lastName,
                    _id: user._id,
                    email: user.email
                })),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            dispatch(addDiagramAction(diagramData));
            return diagramData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al crear el diagrama";
            dispatch(setErrorAction(errorMessage));
            throw new Error(errorMessage);
        } finally {
            dispatch(setLoadingAction(false));
        }
    };

    const deleteDiagramById = async (id: string): Promise<void> => {
        dispatch(setLoadingAction(true));
        try {
            await deleteDiagramUseCase.execute(id, user._id);
            dispatch(deleteDiagramAction(id));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al eliminar el diagrama";
            dispatch(setErrorAction(errorMessage));
            throw new Error(errorMessage);
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