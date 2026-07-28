import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'en' | 'ar';

/** Manages language switching and document direction (LTR/RTL) */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentLang = signal<Lang>('en');

  init(): void {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const saved = this.getSavedLang();
    this.setLanguage(saved);
  }

  setLanguage(lang: Lang): void {
    this.currentLang.set(lang);
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('alproof-lang', lang);
    }
  }

  toggleLanguage(): void {
    const next: Lang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(next);
  }

  private getSavedLang(): Lang {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('alproof-lang');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'en';
  }
}
