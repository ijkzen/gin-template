import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];
