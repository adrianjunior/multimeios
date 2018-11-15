import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbTestComponent } from './pages/db-test/db-test.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';

const routes: Routes = [
    {path: '', component: BookListComponent}
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