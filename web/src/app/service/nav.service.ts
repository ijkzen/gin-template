import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private navSubject = new BehaviorSubject<boolean>(false);
  public nav$ = this.navSubject.asObservable();

  private navigation = "";

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }


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
