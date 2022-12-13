import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongInfoModalComponent } from './song-info-modal/song-info-modal.component';
import { ManualAddSongModalComponent } from './manual-add-song-modal/manual-add-song-modal.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SongInfoModalComponent,
    ManualAddSongModalComponent,
    AuthButtonComponent,
    AuthButtonComponent,
    UserProfileComponent,
    SongListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // MdbModalModule,
    // MdbFormsModule,
    AuthModule.forRoot({
      domain: 'dev-ellgwv75kcdizwbh.eu.auth0.com',
      clientId: 'v8nEdHDsGDAEkpltmDODBs9v51Jpvtth',
    }),
  ],
  providers: [AppComponent, SongListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
