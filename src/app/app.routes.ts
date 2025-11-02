import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { BoardComponent } from './project/board/board.component';
import { OverviewComponent } from './project/overview/overview.component';

export const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent
    },
    {
        path: 'project/:id',
        component: ProjectComponent,
        children: [
            {
                path: '',
                component: OverviewComponent
            },
            {
                path: 'board',
                component: BoardComponent
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)
    }
];
