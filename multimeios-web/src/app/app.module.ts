import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DbTestComponent } from './pages/db-test/db-test.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { EditBookComponent } from './pages/books/edit-book/edit-book.component';
import { AddNoticeComponent } from './pages/notices/add-notice/add-notice.component';
import { NoticeListComponent } from './pages/notices/notice-list/notice-list.component';
import { NoticeProfileComponent } from './pages/notices/notice-profile/notice-profile.component';
import { EditNoticeComponent } from './pages/notices/edit-notice/edit-notice.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { BorrowBookComponent } from './pages/books/borrow-book/borrow-book.component';
import { ReturnBookComponent } from './pages/books/return-book/return-book.component';
import { LogListComponent } from './pages/logs/log-list/log-list.component';
import { BookDonationComponent } from './pages/books/book-donation/book-donation.component';
import { BookProfileComponent } from './pages/books/book-profile/book-profile.component';
import { NavDrawerComponent } from './components/nav-drawer/nav-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    DbTestComponent,
    LoginPageComponent,
    AddBookComponent,
    BookListComponent,
    EditBookComponent,
    AddNoticeComponent,
    NoticeListComponent,
    NoticeProfileComponent,
    EditNoticeComponent,
    AddUserComponent,
    UserListComponent,
    UserProfileComponent,
    EditUserComponent,
    BorrowBookComponent,
    ReturnBookComponent,
    LogListComponent,
    BookDonationComponent,
    BookProfileComponent,
    NavDrawerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
