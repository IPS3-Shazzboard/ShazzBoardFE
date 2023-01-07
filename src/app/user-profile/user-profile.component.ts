import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: ` <ng-container *ngIf="auth.user$ | async as user; else loggedOut">
      Logged in as: {{ user.name }}
    </ng-container>

    <ng-template #loggedOut> Not logged in </ng-template>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
