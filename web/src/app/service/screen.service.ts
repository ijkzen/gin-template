import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ScreenService {
  private displayNameMap = new Map([
    [Breakpoints.XSmall, 0],
    [Breakpoints.Small, 0],
    [Breakpoints.Medium, 0],
    [Breakpoints.Large, 1],
    [Breakpoints.XLarge, 1],
  ]);

  private largeScreenSubject$ = new BehaviorSubject(false);
  largeObservable = this.largeScreenSubject$.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.largeScreenSubject$.next(
              (this.displayNameMap.get(query) ?? 0) > 0
            );
          }
        }
      });

      this.largeScreenSubject$.next(breakpointObserver.isMatched(Breakpoints.Large) || breakpointObserver.isMatched(Breakpoints.XLarge))
  }

  isLargeScreen() {
    return this.largeScreenSubject$.getValue();
  }

  rem2Px(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }
}
