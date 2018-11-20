import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { NoticeListComponent } from './pages/notices/notice-list/notice-list.component';
import { AddNoticeComponent } from './pages/notices/add-notice/add-notice.component';
import { BorrowBookComponent } from './pages/books/borrow-book/borrow-book.component';
import { ReturnBookComponent } from './pages/books/return-book/return-book.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'lista-livros', component: BookListComponent, canActivate: [AuthGuard]},
    {path: 'cadastrar-livro', component: AddBookComponent, canActivate: [AuthGuard]},
    {path: 'alugar-livro', component: BorrowBookComponent, canActivate: [AuthGuard]},
    {path: 'devolver-livro', component: ReturnBookComponent, canActivate: [AuthGuard]},
    {path: 'lista-usuarios', component: UserListComponent, canActivate: [AuthGuard]},
    {path: 'cadastrar-usuario', component: AddUserComponent, canActivate: [AuthGuard]},
    {path: 'lista-noticias', component: NoticeListComponent, canActivate: [AuthGuard]},
    {path: 'postar-noticia', component: AddNoticeComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class AppRoutingModule {}