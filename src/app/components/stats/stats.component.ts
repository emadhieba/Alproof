import { Component, inject, signal, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface StatItem {
  icon: string;
  value: number;
  suffix: string;
  labelKey: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  readonly counters = signal([0, 0, 0, 0]);
  readonly hasAnimated = signal(false);

  readonly stats: StatItem[] = [
    { icon: 'fas fa-award', value: 5, suffix: '+', labelKey: 'STATS.YEARS' },
    { icon: 'fas fa-smile', value: 2000, suffix: '+', labelKey: 'STATS.CLIENTS' },
    { icon: 'fas fa-cut', value: 15000, suffix: '+', labelKey: 'STATS.HAIRCUTS' },
    { icon: 'fas fa-star', value: 4.9, suffix: '', labelKey: 'STATS.RATING' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated()) {
            this.hasAnimated.set(true);
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById('stats');
    if (el) this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  formatNumber(value: number, suffix: string): string {
    if (suffix === '') return value.toFixed(1);
    return value >= 1000 ? value.toLocaleString('en-US') : String(value);
  }

  private animateCounters(): void {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = this.easeOutCubic(step / steps);

      const newCounters = this.stats.map((stat) => {
        if (stat.value % 1 !== 0) {
          return Math.min(stat.value * progress, stat.value);
        }
        return Math.min(Math.floor(stat.value * progress), stat.value);
      });

      this.counters.set(newCounters);

      if (step >= steps) {
        clearInterval(timer);
        this.counters.set(this.stats.map((s) => s.value));
      }
    }, interval);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
