import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongInfoModalComponent } from './song-info-modal/song-info-modal.component';
import { ManualAddSongModalComponent } from './manual-add-song-modal/manual-add-song-modal.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SongListComponent } from './song-list/song-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { NotificationToastComponent } from './notification-toast/notification-toast.component';

@NgModule({
  declarations: [
    AppComponent,
    SongInfoModalComponent,
    ManualAddSongModalComponent,
    AuthButtonComponent,
    AuthButtonComponent,
    UserProfileComponent,
    SongListComponent,
    NavbarComponent,
    NotificationToastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: ['http://localhost:8081/*'],
      },
    }),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    AppComponent,
    SongListComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    NotificationToastComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
