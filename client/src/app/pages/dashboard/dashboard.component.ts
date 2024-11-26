import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isLoading = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.checkFirstTimeLogin();
  }

  /**
   * Vérifie si l'utilisateur est en train de se connecter pour la première fois.
   */
  checkFirstTimeLogin() {
    const currentUrl = this.router.url;
    if (currentUrl !== '/dashboard' && currentUrl.startsWith('/dashboard')) {
      this.isLoading = false;
      return;
    }
    
    const isFirstTime = localStorage.getItem('isFirstLogin');
    if (isFirstTime !== null) {
      this.redirectBasedOnFirstTime(isFirstTime === 'true');
      return;
    }

    this.userService.checkFirstTimeLogin().subscribe(
      (isFirstLogin: boolean) => {
        localStorage.setItem('isFirstLogin', isFirstLogin.toString());
        this.redirectBasedOnFirstTime(isFirstLogin);
      },
      (error) => {
        console.error('Erreur lors de la vérification de la première connexion', error);
        this.isLoading = false;
      }
    );
  }

  /**
   * Redirige l'utilisateur en fonction de son statut de première connexion
   */
  redirectBasedOnFirstTime(isFirstTime: boolean) {
    this.isLoading = false;
    if (isFirstTime) {
      this.router.navigate(['dashboard', 'welcome']);
    } else {
      this.router.navigate(['dashboard', 'home']);
    }
  }

  /**
   * Déconnecte l'utilisateur en appelant le service auth
   */
  logout() {
    this.authService.logout();
  }
}