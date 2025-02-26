import { io, Socket } from 'socket.io-client';
import Config from '../../config';

class WebSocketService {
    private socket: Socket | null = null;

    connect() {
        this.socket = io(Config.SOCKET_URL);
        
        this.socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
        });
    }

    joinDiagramRoom(diagramId: string) {
        if (this.socket) {
            this.socket.emit('joinRoom', diagramId);
        }
    }

    leaveDiagramRoom(diagramId: string) {
        if (this.socket) {
            this.socket.emit('leaveRoom', diagramId);
        }
    }

    onDiagramUpdate(callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on('diagramUpdate', callback);
        }
    }

    emitDiagramChange(diagramId: string, change: any) {
        if (this.socket) {
            this.socket.emit('diagramChange', { diagramId, change });
        }
    }
}

export const webSocketService = new WebSocketService(); 