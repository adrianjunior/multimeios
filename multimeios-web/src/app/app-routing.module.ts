import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbTestComponent } from './pages/db-test/db-test.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';

const routes: Routes = [
    {path: '', component: LoginPageComponent}
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