import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({ providedIn: "root" })
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(false);

  readonly darkTheme$ = this.darkThemeSubject.asObservable();

  constructor() {
    const isDark = localStorage.getItem("darkTheme") === "true";
    this.darkThemeSubject.next(isDark);
    if (isDark) {
      this.setStyle("theme", "magenta-violet.css");
    } else {
      this.removeStyle("theme");
    }
  }

  isDark() {
    return this.darkThemeSubject.value;
  }

  switchTheme(origin?: { x: number; y: number }) {
    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };

    if (!origin || !documentWithTransition.startViewTransition) {
      this.applyThemeToggle();
      return;
    }

    const transition = documentWithTransition.startViewTransition(() => {
      this.applyThemeToggle();
    });

    const endRadius = this.calculateEndRadius(origin.x, origin.y);

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${origin.x}px ${origin.y}px)`,
              `circle(${endRadius}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          {
            duration: 300,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => undefined);
  }

  private applyThemeToggle() {
    if (this.darkThemeSubject.value) {
      localStorage.setItem("darkTheme", "false");
      this.removeStyle("theme");
    } else {
      localStorage.setItem("darkTheme", "true");
      this.setStyle("theme", "magenta-violet.css");
    }
  }

  private calculateEndRadius(x: number, y: number): number {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const distances = [
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y),
    ];

    return Math.max(...distances);
  }

  /**
   * Set the stylesheet with the specified key.
   */
  private setStyle(key: string, href: string) {
    this.darkThemeSubject.next(true);
    getLinkElementForKey(key).setAttribute("href", href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  private removeStyle(key: string) {
    this.darkThemeSubject.next(false);
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement("link");
  linkEl.setAttribute("rel", "stylesheet");
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
