import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AboutFeature,
  GalleryImage,
  Service,
  Testimonial,
  WhyUsItem,
} from '../models';

/** Loads static JSON content for site sections */
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('/assets/data/services.json');
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>('/assets/data/testimonials.json');
  }

  getGallery(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>('/assets/data/gallery.json');
  }

  getWhyUs(): Observable<WhyUsItem[]> {
    return this.http.get<WhyUsItem[]>('/assets/data/why-us.json');
  }

  getAboutFeatures(): Observable<AboutFeature[]> {
    return this.http.get<AboutFeature[]>('/assets/data/about-features.json');
  }
}
