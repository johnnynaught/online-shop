<div class="price-filter-container">
  <h4>Price Range</h4>
  <mat-slider
    class="price-slider"
    [min]="0"
    [max]="1000"
    [step]="10"
    [discrete]="true"
    [displayWith]="formatLabel"
  >
    <input matSliderStartThumb [(ngModel)]="minPrice" (valueChange)="onPriceChange()">
    <input matSliderEndThumb [(ngModel)]="maxPrice" (valueChange)="onPriceChange()">
  </mat-slider>
  <div class="price-range-values">
    <span>{{ minPrice | currency:'USD':'symbol':'1.0-0' }}</span>
    <span>{{ maxPrice | currency:'USD':'symbol':'1.0-0' }}</span>
  </div>
</div>
import { Component } from '@angular/core';

@Component({
  selector: 'app-price-range-filter',
  templateUrl: './price-range-filter.component.html',
  styleUrls: ['./price-range-filter.component.css']
})
export class PriceRangeFilterComponent {
  minPrice: number = 150;
  maxPrice: number = 750;

  /**
   * Formats the label displayed in the slider thumb tooltip.
   * @param value The numeric value of the slider thumb.
   * @returns The formatted string to display.
   */
  formatLabel(value: number): string {
    return `$`;
  }

  /**
   * Called when the slider value changes.
   * In a real application, you would emit an event or call a service
   * to update the list of products based on the new price range.
   */
  onPriceChange(): void {
    // Debounce this function in a real app to avoid excessive updates while dragging.
    console.log(`Price range updated: ${this.minPrice} - ${this.maxPrice}`);
  }
}
.price-filter-container {
  padding: 16px;
  max-width: 400px;
  margin: auto;
}

.price-slider {
  width: 100%;
}

.price-range-values {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
import { NgModule } from '@angular/core';
// ... other imports
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // ... other modules
    MatSliderModule,
    FormsModule,
  ],
  // ...
})
export class YourModule { }
