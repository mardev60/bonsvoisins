import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  /**
   * Vérifie si l'utilisateur est en train de se connecter pour la première fois
   * en envoyant une requête POST à l'API.
   * @returns Observable<boolean> - un observable qui émet true si c'est la première connexion, false sinon
   */
  checkFirstTimeLogin(): Observable<boolean> {
    return this.apiService.post('users/check-first-time', {});
  }

  /**
   * Met à jour les informations utilisateur en envoyant une requête POST.
   * @param user : objet contenant les informations utilisateur à mettre à jour
   * @returns Observable<any> 
   */
  updateUserInfos(user: any): Observable<any> {
    return this.apiService.patch('users/update-user-infos', user);
  }

  /**
   * Récupère les informations de l'utilisateur connecté.
   * @returns Observable<any> - un observable contenant les informations de l'utilisateur
   */
  getMe(): Observable<any> {
    return this.apiService.get('users/me');
  }
}