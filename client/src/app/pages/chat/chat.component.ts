import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConversationsService } from '../../core/services/conversations.service';
import { SocketService } from '../../core/services/socket.service';

interface Message {
  id_sender: number;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {
  navigationData$!: Observable<string | null>;
  mealInfos!: any;

  coverImage = '';
  userImage = '';
  userName = '';
  dishName = '';
  timeRange = '';

  senderId!: number;
  conversationId!: number;
  receiverId!: number;
  messages: Message[] = [];

  newMessage!: string;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<{ navigationData: string | null }>,
    private router: Router,
    private conversationsService: ConversationsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.navigationData$ = this.store.select('navigationData');
    this.navigationData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data) {
          this.mealInfos = data;
          this.initPage();
          this.loadConversation();
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  initPage(): void {
    const meal = this.mealInfos.meal;
    this.coverImage = meal.photo_url;
    this.userImage = meal.user.avatar;
    this.userName = meal.user.first_name;
    this.dishName = meal.name;
    this.timeRange = `Discutez avec ${this.userName}`;
  }

  loadConversation(): void {
    this.conversationsService
      .getConversation(this.mealInfos.meal.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.conversationId = data.id;
        this.messages = data.message;

        if (this.mealInfos.from === 'collection') {
          this.receiverId = data.meal.id_author;
          this.senderId = data.meal.command[0].id_collector;
        }

        this.socketService.listenToConversation(this.conversationId).subscribe((message: Message) => {
          this.messages.push(message);
        });
      });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const payload = {
        conversationId: this.conversationId,
        senderId: this.senderId,
        receiverId: this.receiverId,
        content: this.newMessage,
      };

      this.socketService.sendMessage(payload);
      this.newMessage = '';
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/info']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}