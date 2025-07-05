import { Component } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterOutlet } from "@angular/router";
import { Nav } from "../../../service/bean/nav";
import { NavService } from "../../../service/nav.service";
import { ScreenService } from "../../../service/screen.service";
import { IconButtonComponent } from "../../../shared/icon-button/icon-button.component";
import { NavBarItemComponent } from "../nav-bar-item/nav-bar-item.component";

@Component({
  selector: "app-nav-bar",
  imports: [
    MatDividerModule,
    RouterOutlet,
    NavBarItemComponent,
    MatToolbarModule,
    MatMenuModule,
    IconButtonComponent,
  ],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
  navList: Nav[] = [
    { name: "nav1", url: "/admin/nav/nav1" },
    { name: "nav2", url: "/admin/nav/nav2" },
    { name: "nav3", url: "/admin/nav/nav3" },
  ];

  constructor(
    private screenService: ScreenService,
    private router: Router,
    private navService: NavService
  ) {
    this.navService.select("/admin/nav/nav1");
  }

  isDesktop(): boolean {
    return this.screenService.isLargeScreen();
  }

  onRouter(url: string): void {
    this.router.navigate([url]);
    this.navService.select(url);
  }

  isSelected(url: string): boolean {
    return this.navService.isSelected(url);
  }
}
