import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministrationPanelComponent } from './administration-panel/administration-panel.component';

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
        title: 'Administration Panel'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: '404 - Not found',
    }
];
