import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { LogListComponent } from './pages/books/log-list/log-list.component';
import { BorrowBookComponent } from './pages/books/borrow-book/borrow-book.component';
import { ReturnBookComponent } from './pages/books/return-book/return-book.component';
import { AddNoticeComponent } from './pages/notices/add-notice/add-notice.component';
import { NoticeListComponent } from './pages/notices/notice-list/notice-list.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { ValidateUserEmailModal } from './modals/validate-user-email-modal/validate-user-email-modal';
import { ConfirmBorrowModal } from './modals/confirm-borrow-modal/confirm-borrow-modal';
import { AddUserModal } from './modals/add-user-modal/add-user-modal';
import { AddClassComponent } from './pages/classes/add-class/add-class.component';
import { ClassListComponent } from './pages/classes/class-list/class-list.component';
import { ConfirmReturnModal } from './modals/confirm-return-modal/confirm-return-modal';
import { BorrowingsComponent } from './pages/books/borrowings/borrowings.component';
import { DeletionModal } from './modals/deletion-modal/deletion-modal';
import { EditionModal } from './modals/edition-modal/edition-modal';
import { CreditsComponent } from './pages/credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AddBookComponent,
    BookListComponent,
    AddNoticeComponent,
    NoticeListComponent,
    AddUserComponent,
    UserListComponent,
    BorrowBookComponent,
    ReturnBookComponent,
    LogListComponent,
    ValidateUserEmailModal,
    ConfirmBorrowModal,
    AddUserModal,
    AddClassComponent,
    ClassListComponent,
    ConfirmReturnModal,
    BorrowingsComponent,
    DeletionModal,
    EditionModal,
    CreditsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    ValidateUserEmailModal,
    ConfirmBorrowModal,
    AddUserModal,
    ConfirmReturnModal,
    DeletionModal,
    EditionModal,
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
