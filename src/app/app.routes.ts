import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministrationPanelComponent } from './administration-panel/administration-panel.component';
import { PostAdministrationComponent } from './administration-panel/post-administration/post-administration.component';
import { CommentAdministrationComponent } from './administration-panel/comment-administration/comment-administration.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        //component: AppComponent,
        component: LoginComponent,
        title: 'Admin Panel'
    },
    {
        path: 'adminPanel',
        component: AdministrationPanelComponent,
        title: 'Administration Panel',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: 'posts',
                component: PostAdministrationComponent,
                title: 'Posts Administration', 
            },
            {
                path: 'comments',
                component: CommentAdministrationComponent,
                title: 'Comments Administration', 
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: '404 - Not found',
    }
];
