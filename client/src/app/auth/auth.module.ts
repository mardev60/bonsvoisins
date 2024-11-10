import { NgModule } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    provideAuth0({
      domain: process.env['AUTH0_DOMAIN'] || '',
      clientId: process.env['AUTH0_CLIENT_ID'] || '',
      authorizationParams : {
        redirect_uri: window.location.origin
      }
    })
  ]
})
export class AuthModule {}