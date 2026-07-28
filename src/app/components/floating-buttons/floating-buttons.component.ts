import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-buttons.component.html',
  styleUrl: './floating-buttons.component.scss',
})
export class FloatingButtonsComponent {
  readonly contact = inject(ContactService);
  readonly showBackToTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackToTop.set(window.scrollY > 400);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
