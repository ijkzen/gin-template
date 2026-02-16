import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Nav } from "../../../service/bean/nav";
import { NavService } from "../../../service/nav.service";
import { Router } from "@angular/router";
import { ThemeService } from "../../../service/theme.service";
import { MatRippleModule } from "@angular/material/core";

@Component({
  selector: "app-nav-bar-item",
  imports: [MatRippleModule],
  templateUrl: "./nav-bar-item.component.html",
  styleUrl: "./nav-bar-item.component.scss",
})
export class NavBarItemComponent implements OnInit, OnChanges {
  private navService = inject(NavService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  @Input() data: Nav = new Nav("", "");

  protected isSelected = false;
  protected isDark = false;

  constructor() {
    this.navService.nav$.subscribe((_) => {
      this.checkSelect();
    });
  }
  ngOnInit(): void {
    this.checkSelect();
    this.themeService.darkTheme$.subscribe((value) => {
      this.isDark = value;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkSelect();
  }

  checkSelect() {
    this.isSelected = this.navService.isSelected(this.data.url);
  }

  select(): void {
    this.navService.select(this.data.url);
    this.router.navigate([this.data.url]);
  }
}
