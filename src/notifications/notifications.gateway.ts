import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.id as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      console.log(`User connected: ${userId} with socket ID: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  }

  notifyUser(userId: string, notification: any) {
    const socketId = this.connectedUsers.get(userId);
    console.log('notification');
    console.log(notification);
    console.log('userId');
    console.log(userId);

    if (socketId) {
      this.server.to(socketId).emit('receiveNotification', notification);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  }
}
