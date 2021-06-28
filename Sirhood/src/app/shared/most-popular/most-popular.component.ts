import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent implements OnInit {
  public popularProducts: Product[] = [];

  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
   this.productService.getPopular().subscribe((products: Product[]) => {
     this.popularProducts = products;
   })
  }
}
