import { NgModule } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@NgModule({
  imports: [CommonModule],
  exports: [],
  providers: [
    provideAuth0({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
})
export class AuthModule {}
