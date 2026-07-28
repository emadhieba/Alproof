import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly contact = inject(ContactService);
  readonly year = new Date().getFullYear();

  readonly quickLinks = [
    { fragment: 'home', labelKey: 'NAV.HOME' },
    { fragment: 'about', labelKey: 'NAV.ABOUT' },
    { fragment: 'services', labelKey: 'NAV.SERVICES' },
    { fragment: 'gallery', labelKey: 'NAV.GALLERY' },
    { fragment: 'reviews', labelKey: 'NAV.REVIEWS' },
    { fragment: 'contact', labelKey: 'NAV.CONTACT' },
  ];

  scrollTo(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
