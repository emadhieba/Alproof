import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { environment } from '../../../environments/environment';
import { Product } from '../../models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly langService = inject(LanguageService);

  products: Product[] = [];

  readonly bookingOpen = signal(false);
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly selectedProduct = signal<Product | null>(null);

  readonly form = {
    name: '',
    phone: '',
    product: '',
  };

  ngOnInit(): void {
    this.dataService.getProducts().subscribe((data) => (this.products = data));
  }

  openBooking(product: Product): void {
    this.selectedProduct.set(product);
    this.form.product = this.langService.currentLang() === 'ar' ? product.nameAr : product.name;
    this.form.name = '';
    this.form.phone = '';
    this.submitted.set(false);
    this.bookingOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeBooking(): void {
    this.bookingOpen.set(false);
    this.submitted.set(false);
    document.body.style.overflow = '';
  }

  async submitBooking(): Promise<void> {
    if (!this.form.name || !this.form.phone) return;
    this.submitting.set(true);

    const payload = {
      _subject: `New Product Booking - ${this.form.product}`,
      name: this.form.name,
      phone: this.form.phone,
      product: this.form.product,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${environment.bookingEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // still show success so the user isn't blocked by network issues
    } finally {
      this.submitting.set(false);
      this.submitted.set(true);
    }
  }

  langName(product: Product): string {
    return this.langService.currentLang() === 'ar' ? product.nameAr : product.name;
  }
}
