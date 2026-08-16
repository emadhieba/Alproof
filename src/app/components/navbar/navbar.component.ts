import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly languageService = inject(LanguageService);
  readonly contactService = inject(ContactService);

  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);

  readonly navLinks = [
    { fragment: 'home', labelKey: 'NAV.HOME' },
    { fragment: 'about', labelKey: 'NAV.ABOUT' },
    { fragment: 'services', labelKey: 'NAV.SERVICES' },
    { fragment: 'gallery', labelKey: 'NAV.GALLERY' },
    { fragment: 'contact', labelKey: 'NAV.CONTACT' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  scrollTo(fragment: string): void {
    this.closeMenu();
    const el = document.getElementById(fragment);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
