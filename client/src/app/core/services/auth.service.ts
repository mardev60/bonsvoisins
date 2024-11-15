import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: Auth0Service) {}

  /**
   * Effectue la connexion de l'utilisateur en redirigeant vers la page de connexion d'Auth0.
   * Cette méthode utilise la méthode `loginWithRedirect` d'Auth0 pour initier le processus de connexion.
   */
  login() {
    this.auth.loginWithRedirect();
  }

  /**
   * Déconnecte l'utilisateur en supprimant l'indicateur de première connexion du `localStorage`
   * et en redirigeant l'utilisateur vers la page de déconnexion d'Auth0.
   * @param logoutParams : Paramètres de déconnexion (ici, redirection vers l'origine de la page).
   */
  logout() {
    localStorage.removeItem('isFirstLogin');
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  /**
   * Effectue une inscription de l'utilisateur en le redirigeant vers la page d'inscription d'Auth0.
   * Cette méthode utilise `loginWithRedirect` avec un paramètre spécifique `screen_hint: 'signup'`
   * pour indiquer à Auth0 qu'il s'agit d'une demande d'inscription.
   */
  signup() {
    this.auth.loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  }
}
