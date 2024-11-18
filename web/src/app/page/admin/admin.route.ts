import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { Menu1Component } from './menu-1/menu-1.component';
import { Menu2Component } from './menu-2/menu-2.component';
import { Menu3Component } from './menu-3/menu-3.component';


export const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
        children: [
            {
                path: "",
                redirectTo: "menu1",
                pathMatch: "full"
            },
            {
                path: "menu1",
                component: Menu1Component
            },
            {
                path: "menu2",
                component: Menu2Component
            },
            {
                path: "menu3",
                component: Menu3Component
            }
        ]
    },
];
