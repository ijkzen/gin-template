import { Routes } from '@angular/router';
import { Menu1Component } from '../menu-1/menu-1.component';
import { Menu2Component } from '../menu-2/menu-2.component';
import { Menu3Component } from '../menu-3/menu-3.component';
import { NavBarComponent } from './nav-bar.component';



export const routes: Routes = [
    {
        path: "",
        component: NavBarComponent,
        children:[
            {
                path: "",
                redirectTo: "nav1",
                pathMatch: "full"
            },
            {
                path: "nav1",
                component: Menu1Component
            },
            {
                path: "nav2",
                component: Menu2Component
            },
            {
                path: "nav3",
                component: Menu3Component
            }
        ]
    }
];
