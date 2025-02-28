// src/features/diagrams/hooks/useDiagramFetch.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { DiagramData } from "../types/diagramTypes";
import {
    setDiagramsAction,
    addDiagramAction,
    deleteDiagramAction,
    setLoadingAction,
    setErrorAction,
    updateDiagramAction
} from "../../../app/store/actions/diagramActions";
import { useErrorHandler } from "../../../app/hooks/useErrorHandler";
import diagramService from "../../../infrastructure/api/diagramApi";
import { Diagram } from "../../../core/diagrams/entities/Diagram";
import { LocalStorageService, StorageKeys } from "../../../infrastructure/storage/localStorage";
import { User } from "../../../core/auth/entities/User";

/**
 * Interfaz para el resultado del hook useDiagramFetch
 */
interface UseDiagramFetchResult {
    /** Lista de diagramas cargados */
    diagrams: DiagramData[];
    /** Indica si hay una operación en curso */
    loading: boolean;
    /** Mensaje de error si ocurrió alguno */
    error: string | null;
    /** Función para crear un nuevo diagrama */
    createDiagram: (name: string) => Promise<DiagramData>;
    /** Función para eliminar un diagrama por su ID */
    deleteDiagram: (id: string) => Promise<void>;
    /** Función para recargar la lista de diagramas */
    refreshDiagrams: () => Promise<DiagramData[]>;
    /** Función para agregar un participante a un diagrama por correo electrónico */
    addParticipantToDiagram: (diagramId: string, participantEmail: string) => Promise<DiagramData>;
}

/**
 * Hook personalizado para gestionar la obtención y manipulación de diagramas
 * Sigue las mejores prácticas de React Hooks y TypeScript para evitar bucles infinitos
 * y mantener un código limpio, tipado y mantenible.
 *
 * @returns {UseDiagramFetchResult} Objeto con los diagramas, estado y funciones para manipularlos
 */
export const useDiagramFetch = (): UseDiagramFetchResult => {
    // Hooks y estado
    const dispatch = useAppDispatch();
    const { diagrams, loading, error } = useAppSelector(state => state.diagrams);
    const { handleError } = useErrorHandler();

    // Estado local
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    // Referencias para evitar dependencias inestables
    const userRef = useRef<User | null>(null);

    // Inicializar referencias al montar el componente
    useEffect((): void => {
        const storedUser = LocalStorageService.getItem<User>(StorageKeys.USER);
        userRef.current = storedUser;
    }, []);

    /**
     * Obtiene los diagramas del usuario actual
     * Esta función es memoizada para evitar recreaciones innecesarias
     *
     * @returns {Promise<DiagramData[]>} Lista de diagramas obtenidos
     */
    const fetchDiagrams = useCallback(async (): Promise<DiagramData[]> => {
        // Validar que exista un usuario
        if (!userRef.current?._id) {
            dispatch(setErrorAction("No hay un usuario autenticado"));
            return [];
        }

        // Iniciar carga
        dispatch(setLoadingAction(true));

        try {
            // Obtener datos de la API
            const userId = userRef.current._id;
            const userEmail = userRef.current.email || "";

            const data = await diagramService.getDiagramsByUserId(userId);

            // Transformar datos
            const diagramsData = data.map((diagram: Diagram) =>
                diagramService.transformToData(diagram, userId, userEmail)
            );

            // Actualizar estado
            dispatch(setDiagramsAction(diagramsData));
            setHasLoaded(true);

            return diagramsData;
        } catch (error) {
            // Manejar errores
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
            return [];
        } finally {
            // Finalizar carga
            dispatch(setLoadingAction(false));
        }
    }, [dispatch, handleError]);

    /**
     * Crea un nuevo diagrama
     *
     * @param {string} name Nombre del diagrama a crear
     * @returns {Promise<DiagramData>} Datos del diagrama creado
     * @throws {Error} Si no hay usuario autenticado o hay un error en la creación
     */
    const createDiagram = useCallback(async (name: string): Promise<DiagramData> => {
        if (!userRef.current?._id) {
            throw new Error("No hay un usuario autenticado");
        }

        dispatch(setLoadingAction(true));

        try {
            const userId = userRef.current._id;
            const userEmail = userRef.current.email || "";

            const newDiagram = await diagramService.createDiagram(name, userId);
            const diagramData = diagramService.transformToData(newDiagram, userId, userEmail);

            dispatch(addDiagramAction(diagramData));

            return diagramData;
        } catch (error) {
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
            throw appError;
        } finally {
            dispatch(setLoadingAction(false));
        }
    }, [dispatch, handleError]);

    /**
     * Elimina un diagrama por su ID
     *
     * @param {string} id ID del diagrama a eliminar
     * @returns {Promise<void>}
     * @throws {Error} Si no hay usuario autenticado o hay un error en la eliminación
     */
    const deleteDiagram = useCallback(async (id: string): Promise<void> => {
        if (!userRef.current?._id) {
            throw new Error("No hay un usuario autenticado");
        }

        dispatch(setLoadingAction(true));

        try {
            await diagramService.deleteDiagram(id, userRef.current._id);
            dispatch(deleteDiagramAction(id));
        } catch (error) {
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
            throw appError;
        } finally {
            dispatch(setLoadingAction(false));
        }
    }, [dispatch, handleError]);

    /**
     * Agregar un participante a un diagrama por correo electrónico
     *
     * @param {string} diagramId ID del diagrama al que se agregará el participante
     * @param {string} participantEmail Correo electrónico del participante a agregar
     * @returns {Promise<DiagramData>} Datos del diagrama actualizado
     */
    const addParticipantToDiagram = useCallback(async (diagramId: string, participantEmail: string): Promise<DiagramData> => {
        if (!userRef.current?._id) {
            throw new Error("No hay un usuario autenticado");
        }

        dispatch(setLoadingAction(true));

        try {
            const userId = userRef.current._id;
            const userEmail = userRef.current.email || "";

            const updatedDiagram = await diagramService.addParticipantToDiagram(diagramId, participantEmail);
            const diagramData = diagramService.transformToData(updatedDiagram, userId, userEmail);

            dispatch(updateDiagramAction(diagramData));

            return diagramData;
        } catch (error) {
            const appError = handleError(error);
            dispatch(setErrorAction(appError.message));
            throw appError;
        } finally {
            dispatch(setLoadingAction(false));
        }
    }, [dispatch, handleError]);

    // Cargar diagramas al inicializar el hook
    useEffect((): void => {
        // Solo cargar si hay un usuario y no se han cargado antes
        if (userRef.current?._id && !hasLoaded) {
            fetchDiagrams();
        }
    }, [fetchDiagrams, hasLoaded]);

    // Actualizar la referencia del usuario cuando cambie en localStorage
    useEffect((): (() => void) => {
        const handleStorageChange = (): void => {
            const updatedUser = LocalStorageService.getItem<User>(StorageKeys.USER);

            // Si el usuario cambió, actualizar la referencia y recargar
            if (updatedUser?._id !== userRef.current?._id) {
                userRef.current = updatedUser;
                setHasLoaded(false); // Forzar recarga de diagramas
            }
        };

        // Escuchar cambios en localStorage
        window.addEventListener('storage', handleStorageChange);

        return (): void => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return {
        diagrams,
        loading,
        error,
        createDiagram,
        deleteDiagram,
        refreshDiagrams: fetchDiagrams,
        addParticipantToDiagram
    };
};