import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

/** Builds WhatsApp and phone links from environment config */
@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly phoneNumber = environment.phoneNumber;
  readonly whatsappMessage = environment.whatsappMessage;
  readonly instagram = environment.instagram;
  readonly facebook = environment.facebook;
  readonly address = environment.address;
  readonly mapEmbedUrl = environment.mapEmbedUrl;

  get whatsappUrl(): string {
    const text = encodeURIComponent(this.whatsappMessage);
    return `https://wa.me/${this.phoneNumber}?text=${text}`;
  }

  getWhatsAppUrlForService(serviceName: string): string {
    const msg = encodeURIComponent(`Hello ALPROOF, I would like to book: ${serviceName}`);
    return `https://wa.me/${this.phoneNumber}?text=${msg}`;
  }

  getWhatsAppUrlForServiceAr(serviceNameAr: string): string {
    const msg = encodeURIComponent(`مرحباً ALPROOF، أريد حجز: ${serviceNameAr}`);
    return `https://wa.me/${this.phoneNumber}?text=${msg}`;
  }

  get telUrl(): string {
    return `tel:+${this.phoneNumber}`;
  }

  get formattedPhone(): string {
    return `+${this.phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`;
  }
}
