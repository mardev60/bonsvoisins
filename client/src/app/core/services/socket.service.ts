import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(env.api.serverUrl);
  }

  listenToConversation(conversationId: number): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(`conversation:${conversationId}`, (message) => {
        observer.next(message);
      });

      return () => this.socket.off(`conversation:${conversationId}`);
    });
  }

  sendMessage(payload: any): void {
    this.socket.emit('sendMessage', payload);
  }
}