import { NgModule } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { environment as env } from '../../environments/environment.development';

@NgModule({
  imports: [CommonModule],
  exports: [],
  providers: [provideAuth0(env.auth0)],
})
export class AuthModule {}
