import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/signin/signin.component';
import { AuthGuard } from './core/auth.guard';
import { ProjectsComponent } from './features/projects/projects.component';
import { WorksComponent } from './features/works/works.component';
import { WorkFormComponent } from './features/works/work-form/work-form.component';
import { ProjectInfoComponent } from './features/projects/project-info/project-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'projects',
    canMatch: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: ':id',
        component: ProjectInfoComponent,
      },
    ],
  },
  {
    path: 'works',
    canMatch: [AuthGuard],
    children: [
      {
        path: '',
        component: WorksComponent,
      },
      {
        path: ':id',
        component: WorkFormComponent,
      },
    ],
  },
];
