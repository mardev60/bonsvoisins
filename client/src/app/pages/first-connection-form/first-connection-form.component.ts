import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-first-connection-form',
  templateUrl: './first-connection-form.component.html',
})
export class FirstConnectionFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  isFormLoading = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.initUserForm();
  }

  /**
   * Méthode exécutée lors de la soumission du formulaire
   * Vérifie si le formulaire est valide, puis appelle la méthode de mise à jour de l'utilisateur
   * @returns void
   */
  submitForm(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.setLoadingState(true);
    const user = this.userForm.value;
    
    this.userService.updateUserInfos(user).subscribe(
      (userUpdated) => this.handleUpdateSuccess(userUpdated),
      (error) => this.handleUpdateError(error)
    );
  }

  /**
   * Méthode d'initialisation du formulaire utilisateur
   * Crée un formulaire avec les champs nécessaires et les validations associées
   * @returns void
   */
  private initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  /**
   * Méthode pour gérer l'état de chargement du formulaire
   * Active ou désactive l'état de chargement en fonction du paramètre passé
   * @param state : booléen - L'état de chargement (true ou false)
   * @returns void
   */
  private setLoadingState(state: boolean): void {
    this.isFormLoading = state;
  }

  /**
   * Méthode exécutée lorsque la mise à jour de l'utilisateur est réussie
   * Si l'utilisateur a été mis à jour avec succès, navigue vers le dashboard
   * @param userUpdated : booléen - Indique si la mise à jour a été effectuée avec succès
   * @returns void
   */
  private handleUpdateSuccess(userUpdated: boolean): void {
    this.setLoadingState(false);
    if (userUpdated) {
      localStorage.setItem('isFirstLogin', 'false');
      this.router.navigate(['dashboard', 'home']);
    } else {
      console.error('Erreur lors de la mise à jour des informations utilisateur');
    }
  }

  /**
   * Méthode exécutée lorsqu'il y a une erreur lors de la mise à jour des informations de l'utilisateur
   * Affiche l'erreur dans la console et désactive l'état de chargement
   * @param error : any - L'erreur reçue de la requête HTTP
   * @returns void
   */
  private handleUpdateError(error: any): void {
    this.setLoadingState(false);
    console.error('Erreur lors de la mise à jour des informations utilisateur', error);
  }
}