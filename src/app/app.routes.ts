import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/signin/signin.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: "home",
        component: AppComponent,
        canMatch: [AuthGuard]
    },
    {
        path: "signin",
        component: SigninComponent
    }
];
