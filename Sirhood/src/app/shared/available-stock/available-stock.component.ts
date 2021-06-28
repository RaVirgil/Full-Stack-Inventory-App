import { Component, Input } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';

@Component({
  selector: 'app-available-stock',
  templateUrl: './available-stock.component.html',
  styleUrls: ['./available-stock.component.css']
})
export class AvailableStockComponent {  
  @Input() product: Product;

}
