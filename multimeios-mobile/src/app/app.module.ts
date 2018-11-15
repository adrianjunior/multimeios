import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout'

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DbTestComponent } from './pages/db-test/db-test.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { NoticeListComponent } from './pages/notices/notice-list/notice-list.component';
import { NoticeProfileComponent } from './pages/notices/notice-profile/notice-profile.component';
import { MedalListComponent } from './pages/profile/medal-list/medal-list.component';
import { MedalProfileComponent } from './pages/profile/medal-profile/medal-profile.component';
import { ReadedbooksListComponent } from './pages/profile/readedbooks-list/readedbooks-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DbTestComponent,
    BookListComponent,
    NoticeListComponent,
    NoticeProfileComponent,
    MedalListComponent,
    MedalProfileComponent,
    ReadedbooksListComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
