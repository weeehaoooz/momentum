import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { BoardComponent } from './project/board/board.component';
import { OverviewComponent } from './project/overview/overview.component';
import { SettingsComponent } from './project/settings/settings.component';
import { IssuesComponent } from './project/settings/issues/issues.component';

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
            },
            {
                path: 'settings',
                component: SettingsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'issues',
                        pathMatch: 'full'
                    },
                    {
                        path: 'issues',
                        component: IssuesComponent
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)
    }
];
