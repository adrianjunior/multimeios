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
import { BookListComponent } from './page/books/book-list/book-list.component';
import { NoticeListComponent } from './page/notices/notice-list/notice-list.component';
import { NoticeProfileComponent } from './page/notices/notice-profile/notice-profile.component';
import { WishlistComponent } from './page/books/wishlist/wishlist.component';
import { MedalListComponent } from './pages/profile/medal-list/medal-list.component';
import { MedalProfileComponent } from './pages/profile/medal-profile/medal-profile.component';
import { ReadedbooksListComponent } from './pages/profile/readedbooks-list/readedbooks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DbTestComponent,
    BookListComponent,
    NoticeListComponent,
    NoticeProfileComponent,
    WishlistComponent,
    MedalListComponent,
    MedalProfileComponent,
    ReadedbooksListComponent,
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
