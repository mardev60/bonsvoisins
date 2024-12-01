import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConversationsService } from '../../core/services/conversations.service';
import { SocketService } from '../../core/services/socket.service';

interface MealInfo {
  from: 'collection' | 'suggestion';
  meal?: {
    id: number;
    photo_url: string;
    user: {
      avatar: string;
      first_name: string;
    };
    name: string;
    id_author?: number;
    command?: { id_collector: number }[];
  };
  id?: number;
}

interface Message {
  id_sender: number;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
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

  newMessage = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<{ navigationData: string | null }>,
    private router: Router,
    private conversationsService: ConversationsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.navigationData$ = this.store.select('navigationData');
    this.navigationData$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      if (data) {
        this.mealInfos = data;
        this.initPage();
        this.loadConversation();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private initPage(): void {
    const meal = this.mealInfos.meal || this.mealInfos;

    if(this.mealInfos.from === 'collection') {
      console.log('coll', this.mealInfos);
      this.coverImage = meal.photo_url;
      this.userImage = meal.user.avatar;
      this.userName = meal.user.first_name;
      this.dishName = meal.name;
      this.timeRange = `Discutez avec ${this.userName}`;
    } else if (this.mealInfos.from === 'suggestion'){
      console.log('sugg', this.mealInfos);
      this.coverImage = meal.photo_url;
      this.userImage = meal.command[0].user.avatar;
      this.userName = meal.command[0].user.first_name;
      this.dishName = meal.name;
      this.timeRange = `Discutez avec ${this.userName}`;
    }
  }

  private loadConversation(): void {
    const mealId = this.mealInfos.from === 'collection' ? this.mealInfos.meal!.id : this.mealInfos.id!;
    this.conversationsService
      .getConversation(mealId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.handleConversationData(data));
  }

  private handleConversationData(data: any): void {
    this.conversationId = data.id;
    this.messages = data.message;

    const meal = data.meal;

    if(this.mealInfos.from === 'collection') {
      this.receiverId = meal.id_author;
      this.senderId = meal.command[0].id_collector;
    } else {
      this.receiverId = meal.command[0].id_collector;
      this.senderId = meal.id_author;
    }

    this.socketService.listenToConversation(this.conversationId).subscribe((message: Message) => {
      this.messages.push(message);
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