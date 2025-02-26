import { useEffect, useCallback } from 'react';
import { webSocketService } from '../../../infrastructure/websockets/socket';
import { useDispatch } from 'react-redux';
import { updateDiagram } from '../../../app/store/slices/diagramSlice';

export const useDiagramSocket = (diagramId: string) => {
    const dispatch = useDispatch();

    const handleDiagramUpdate = useCallback((data: any) => {
        dispatch(updateDiagram(data));
    }, [dispatch]);

    useEffect(() => {
        if (diagramId) {
            webSocketService.joinDiagramRoom(diagramId);
            webSocketService.onDiagramUpdate(handleDiagramUpdate);

            return () => {
                webSocketService.leaveDiagramRoom(diagramId);
            };
        }
    }, [diagramId, handleDiagramUpdate]);

    const emitChange = useCallback((change: any) => {
        webSocketService.emitDiagramChange(diagramId, change);
    }, [diagramId]);

    return { emitChange };
}; 