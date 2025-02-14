import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/signin/signin.component';
import { AuthGuard } from './core/auth.guard';
import { ProjectsComponent } from './features/projects/projects.component';
import {ProjectDetailsComponent} from "./features/projects/project-details/project-details.component";
import {WorksComponent} from "./features/works/works.component";
import {WorkDetailsComponent} from "./features/works/work-details/work-details.component";

export const routes: Routes = [
    {
        path: '', redirectTo: 'projects', pathMatch: 'full',
    },
    {
        path: "home",
        component: AppComponent
    },
    {
        path: "signin",
        component: SigninComponent
    },
    {
        path: "projects",
        canMatch: [AuthGuard],
        children: [{
            path: "",
            component: ProjectsComponent
        },{
            path: ":id",
            component: ProjectDetailsComponent
        }]
    },
    {
        path: "works",
        canMatch: [AuthGuard],
        children: [{
            path: "",
            component: WorksComponent
        },{
            path: ":id",
            component: WorkDetailsComponent
        }]
    }
];
