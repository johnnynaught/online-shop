
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent {
  minPrice: number;
  maxPrice: number;

  @Output() filterApplied = new EventEmitter<{ minPrice: number; maxPrice: number }>();

  applyFilter() {
    this.filterApplied.emit({ minPrice: this.minPrice, maxPrice: this.maxPrice });
  }
}

