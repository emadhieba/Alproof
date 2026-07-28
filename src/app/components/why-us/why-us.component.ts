import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { WhyUsItem } from '../../models';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent implements OnInit {
  private readonly dataService = inject(DataService);
  items: WhyUsItem[] = [];

  ngOnInit(): void {
    this.dataService.getWhyUs().subscribe((data) => (this.items = data));
  }
}
