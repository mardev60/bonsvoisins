import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  constructor(private apiService: ApiService) {}

  getAllUserCommands(): Observable<any[]> {
    return this.apiService.get('commands/all-commands');
  }

  validateCommand(id: number, collect_code: string): Observable<any[]> {
    return this.apiService.put('commands/collect', {id, collect_code});
  }

  createNewCommand(mealId: number): Observable<any[]> {
    return this.apiService.post(`commands/${mealId}`, {});
  }

}