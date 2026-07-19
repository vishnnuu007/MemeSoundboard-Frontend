import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'theme';

  constructor() {
    this.applyInitialTheme();
    this.listenForSystemChanges();
  }

  private applyInitialTheme(): void {

    const saved = localStorage.getItem(this.storageKey);

    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      return;
    }

    if (saved === 'light') {
      document.body.classList.remove('dark-mode');
      return;
    }

    // No explicit user choice saved yet — follow the system setting.
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (systemPrefersDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

  }

  private listenForSystemChanges(): void {

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {

      // Only auto-switch if the user hasn't manually chosen a theme.
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return;
      }

      if (event.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

    });

  }

  toggleTheme(): void {

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem(this.storageKey, 'dark');
    } else {
      localStorage.setItem(this.storageKey, 'light');
    }

  }

  isDark(): boolean {
    return document.body.classList.contains('dark-mode');
  }

}