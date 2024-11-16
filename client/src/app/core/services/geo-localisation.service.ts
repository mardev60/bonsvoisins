import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoLocalisationService {
  constructor(private apiService: ApiService) {}

  getGeolocalisation(): Observable<boolean> {
    return this.apiService.get('geo-localisation');
  }
}