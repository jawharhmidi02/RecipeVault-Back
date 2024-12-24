"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let NotificationsGateway = class NotificationsGateway {
    constructor() {
        this.connectedUsers = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.id;
        if (userId) {
            this.connectedUsers.set(userId, client.id);
            console.log(`User connected: ${userId} with socket ID: ${client.id}`);
        }
    }
    handleDisconnect(client) {
        for (const [userId, socketId] of this.connectedUsers.entries()) {
            if (socketId === client.id) {
                this.connectedUsers.delete(userId);
                console.log(`User disconnected: ${userId}`);
                break;
            }
        }
    }
    notifyUserForAcceptedSpecialist(userId, notification) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.server
                .to(socketId)
                .emit('receiveNotificationForAcceptedSpecialist', notification);
        }
    }
    notifyUserForAcceptedRecipe(userId, notification) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.server
                .to(socketId)
                .emit('receiveNotificationForAcceptedRecipe', notification);
        }
    }
    notifyUserForLike(userId, notification) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('receiveNotification', notification);
        }
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], NotificationsGateway);
//# sourceMappingURL=notifications.gateway.js.map