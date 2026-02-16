import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  private navSubject = new BehaviorSubject<boolean>(false);
  readonly nav$ = this.navSubject.asObservable();

  private navigation = "";


  isSelected(navigation: string) {
    if (this.navigation === "") {
      return this.router.url === navigation;
    }

    return this.navigation === navigation;
  }

  select(navigation: string) {
    this.navigation = navigation;
    this.navSubject.next(true);
  }
}
