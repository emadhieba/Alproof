import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { GalleryImage } from '../../models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  private readonly dataService = inject(DataService);
  images: GalleryImage[] = [];
  readonly lightboxOpen = signal(false);
  readonly activeIndex = signal(0);

  ngOnInit(): void {
    this.dataService.getGallery().subscribe((data) => (this.images = data));
  }

  openLightbox(index: number): void {
    this.activeIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  prev(): void {
    const idx = this.activeIndex();
    this.activeIndex.set(idx === 0 ? this.images.length - 1 : idx - 1);
  }

  next(): void {
    const idx = this.activeIndex();
    this.activeIndex.set(idx === this.images.length - 1 ? 0 : idx + 1);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'ArrowRight') this.next();
  }
}
