import { inject, Injectable, InjectionToken } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window;
    }
    return new Window(); // does this work?
  },
});

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  readonly window = inject(WINDOW);
  readonly navigator = this.window.navigator;
}
