import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { ContactService } from '../../services/contact.service';
import { LanguageService } from '../../services/language.service';
import { Service } from '../../models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  private readonly dataService = inject(DataService);
  readonly contactService = inject(ContactService);
  private readonly langService = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  services: Service[] = [];

  ngOnInit(): void {
    this.dataService.getServices().subscribe((data) => (this.services = data));
  }

  getBookUrl(service: Service): string {
    const serviceName = this.translate.instant(service.titleKey);
    if (this.langService.currentLang() === 'ar') {
      return this.contactService.getWhatsAppUrlForServiceAr(serviceName);
    }
    return this.contactService.getWhatsAppUrlForService(serviceName);
  }
}
