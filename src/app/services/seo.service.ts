import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

const META_EN = {
  title: `${environment.siteName} | Premium Men's Grooming`,
  description:
    'ALPROOF Barbershop - Premium men\'s grooming experience. Expert haircuts, beard trims, and luxury styling in Cairo.',
  keywords: 'barbershop, mens grooming, haircut, beard trim, luxury salon, ALPROOF',
  ogDescription: 'Professional grooming experience at ALPROOF Barbershop.',
};

const META_AR = {
  title: `${environment.siteName} | تجربة حلاقة رجالية فاخرة`,
  description:
    'ALPROOF صالون حلاقة - تجربة عناية رجالية فاخرة. قصات شعر احترافية، تهذيب لحية، وتصفيف فاخر.',
  keywords: 'صالون حلاقة, عناية رجالية, قص شعر, تهذيب لحية, صالون فاخر, ALPROOF',
  ogDescription: 'تجربة عناية احترافية في ALPROOF Barbershop.',
};

/** Updates page title and meta tags for SEO, supports language switching */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.setMeta('ar');
    this.translate.onLangChange.subscribe((e) => this.setMeta(e.lang));
  }

  private setMeta(lang: string): void {
    const m = lang === 'ar' ? META_AR : META_EN;

    this.title.setTitle(m.title);
    this.meta.updateTag({ name: 'description', content: m.description });
    this.meta.updateTag({ name: 'keywords', content: m.keywords });
    this.meta.updateTag({ property: 'og:title', content: environment.siteName });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: environment.siteUrl });
    this.meta.updateTag({ property: 'og:description', content: m.ogDescription });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'ar' ? 'ar_EG' : 'en_US' });
  }
}
