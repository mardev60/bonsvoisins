import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeoLocalisationService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  getGeolocalisation(): Observable<boolean> {
    return this.apiService.get('geo-localisation');
  }

  searchAdresses(query : string): Observable<boolean> {
    return this.http.get<any>(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`);
  }
}