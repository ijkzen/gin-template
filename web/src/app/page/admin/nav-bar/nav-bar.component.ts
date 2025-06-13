import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider'
import { RouterOutlet } from '@angular/router';
import { Nav } from '../../../service/bean/nav';
import { NavBarItemComponent } from '../nav-bar-item/nav-bar-item.component';
@Component({
    selector: 'app-nav-bar',
    imports: [MatDividerModule, RouterOutlet, NavBarItemComponent],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  navList : Nav[] = [
    {name:'nav1',url:'/admin/nav/nav1'},
    {name:'nav2',url:'/admin/nav/nav2'},
    {name:'nav3',url:'/admin/nav/nav3'}
  ]
}
