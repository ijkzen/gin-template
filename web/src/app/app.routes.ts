import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin",
        loadChildren: () => import("./page/admin/admin.route").then(m => m.routes),
        canActivate: [authGuard]
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];
