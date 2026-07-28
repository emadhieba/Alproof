import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly contactService = inject(ContactService);

  scrollToServices(): void {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }
}
