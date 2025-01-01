import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({ providedIn: 'root' })
export class StyleManagerService {

  private darkThemeSubject = new BehaviorSubject<boolean>(false);

  darkTheme$ = this.darkThemeSubject.asObservable();

  isDark() {
    return this.darkThemeSubject.value;
  }

  switchTheme() {
    if (this.darkThemeSubject.value) {
      this.removeStyle("theme");
    } else {
      this.setStyle("theme", "magenta-violet.css");
    }
  }

  /**
   * Set the stylesheet with the specified key.
   */
  private setStyle(key: string, href: string) {
    this.darkThemeSubject.next(true);
    getLinkElementForKey(key).setAttribute('href', href);
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
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
