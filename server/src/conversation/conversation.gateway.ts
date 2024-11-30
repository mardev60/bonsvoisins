import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from './conversation.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ConversationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private conversationService: ConversationService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connecté : ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client déconnecté : ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    payload: {
      conversationId: number;
      senderId: number;
      receiverId: number;
      content: string;
    },
  ) {
    const { conversationId, senderId, receiverId, content } = payload;

    const message = await this.conversationService.sendMessage(
      conversationId,
      senderId,
      receiverId,
      content,
    );

    this.server.emit(`conversation:${conversationId}`, message);
    return message;
  }
}
