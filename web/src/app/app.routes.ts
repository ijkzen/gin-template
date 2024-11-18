import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AdminComponent } from './page/admin/admin.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin",
        loadChildren: () => import("./page/admin/admin.route").then(m => m.routes)
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];
