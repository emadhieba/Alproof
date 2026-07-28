import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { Testimonial } from '../../models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private readonly dataService = inject(DataService);
  readonly languageService = inject(LanguageService);
  testimonials: Testimonial[] = [];
  readonly activeSlide = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.dataService.getTestimonials().subscribe((data) => {
      this.testimonials = data;
      this.startAutoSlide();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  getClientName(t: Testimonial): string {
    return this.languageService.currentLang() === 'ar' ? t.nameAr : t.name;
  }

  goToSlide(index: number): void {
    this.activeSlide.set(index);
    this.restartAutoSlide();
  }

  prev(): void {
    const idx = this.activeSlide();
    this.activeSlide.set(idx === 0 ? this.testimonials.length - 1 : idx - 1);
    this.restartAutoSlide();
  }

  next(): void {
    const idx = this.activeSlide();
    this.activeSlide.set(idx === this.testimonials.length - 1 ? 0 : idx + 1);
    this.restartAutoSlide();
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => this.next(), 5000);
  }

  private stopAutoSlide(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private restartAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
