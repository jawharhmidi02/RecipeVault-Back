import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    notifyUserForAcceptedSpecialist(userId: string, notification: any): void;
    notifyUserForAcceptedRecipe(userId: string, notification: any): void;
    notifyUserForLike(userId: string, notification: any): void;
}
