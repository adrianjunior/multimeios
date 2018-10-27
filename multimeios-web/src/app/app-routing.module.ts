import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbTestComponent } from './pages/db-test/db-test.component';

const routes: Routes = [
    {path: '', component: DbTestComponent}
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