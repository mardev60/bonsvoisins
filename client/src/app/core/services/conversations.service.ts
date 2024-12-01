import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  constructor(private apiService: ApiService) {}

  getConversation(mealId: number): Observable<any> {
    return this.apiService.get(`conversation/${mealId}`);
  }

}