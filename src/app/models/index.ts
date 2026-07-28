export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  price: number;
  currency: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  photo: string;
  rating: number;
  reviewKey: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  altKey: string;
  category: string;
}

export interface WhyUsItem {
  id: string;
  icon: string;
  titleKey: string;
}

export interface AboutFeature {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}


