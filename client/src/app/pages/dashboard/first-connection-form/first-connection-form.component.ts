import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-connection-form',
  templateUrl: './first-connection-form.component.html',
  styleUrl: './first-connection-form.component.scss'
})

export class FirstConnectionFormComponent {

  constructor(private apiService : ApiService, private fb: FormBuilder, private router : Router) {}

  userForm: FormGroup = new FormGroup({});
  isLoading = false;
  user = {
    firstName: '',
    lastName: '',
    phone: '',
  };

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.user = this.userForm.value;
    this.apiService.post('users/update-user-infos', this.user).subscribe((userUpdated) => {
      this.isLoading = false;
      if (userUpdated) {
        console.log(userUpdated);
        this.router.navigate(['dashboard']);
      } else {
        console.log('Erreur lors de la mise à jour des informations utilisateur');
      }
    });
  }
  

}
