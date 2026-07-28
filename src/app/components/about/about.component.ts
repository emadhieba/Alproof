import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { AboutFeature } from '../../models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private readonly dataService = inject(DataService);
  features: AboutFeature[] = [];

  ngOnInit(): void {
    this.dataService.getAboutFeatures().subscribe((data) => (this.features = data));
  }
}
