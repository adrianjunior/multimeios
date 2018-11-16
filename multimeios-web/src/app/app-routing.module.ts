import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbTestComponent } from './pages/db-test/db-test.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';

const routes: Routes = [
    {path: '', component: BookListComponent},
    {path: 'lista-livros', component: BookListComponent},
    {path: 'cadastrar-livro', component: AddBookComponent},
    {path: 'lista-usuarios', component: UserListComponent},
    {path: 'cadastrar-usuario', component: AddUserComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}