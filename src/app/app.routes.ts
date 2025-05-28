import { Routes } from '@angular/router';
import { SigninComponent } from './features/signin/signin.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { WorksComponent } from './features/works/works.component';
import { ProjectInfoComponent } from './features/projects/project-info/project-info.component';
import { WorkInfoComponent } from './features/works/work-info/work-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'projects',
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
    children: [
      {
        path: '',
        component: WorksComponent,
      },
      {
        path: ':id',
        component: WorkInfoComponent,
      },
    ],
  },
];
