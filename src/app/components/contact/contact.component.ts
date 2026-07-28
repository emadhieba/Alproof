import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly contact = inject(ContactService);
  readonly mapUrl: SafeResourceUrl;

  constructor() {
    const sanitizer = inject(DomSanitizer);
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(this.contact.mapEmbedUrl);
  }
}
