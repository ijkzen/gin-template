import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Nav } from '../../../service/bean/nav';
import { NavService } from '../../../service/nav.service';
import { Router } from '@angular/router';
import { StyleManagerService } from '../../../service/style-manager.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
    selector: 'app-nav-bar-item',
    imports: [MatRippleModule],
    templateUrl: './nav-bar-item.component.html',
    styleUrl: './nav-bar-item.component.scss'
})
export class NavBarItemComponent implements OnInit, OnChanges {

  @Input() data: Nav = new Nav("", "");

  isSelected = false;
  isDark = false;

  constructor(
    private navService: NavService,
    private router: Router,
    private themeService: StyleManagerService
  ) {
    this.navService.nav$.subscribe(_ => {
      this.checkSelect();
    })
  }
  ngOnInit(): void {
    this.checkSelect();
    this.themeService.darkTheme$.subscribe(value => {
      this.isDark = value;
    })
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
