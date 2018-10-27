import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DbTestComponent } from './pages/db-test/db-test.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    DbTestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
