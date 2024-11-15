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
   * @returns Observable<boolean> - un observable qui émet true si la mise à jour a réussi
   */
    updateUserInfos(user: any): Observable<boolean> {
      return this.apiService.post('users/update-user-infos', user);
    }
}