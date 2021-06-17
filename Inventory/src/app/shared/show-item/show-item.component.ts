import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../@core/services/inventory-service.service';
import { Product } from '../../@core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogBoxComponent } from '../product-item-dialog-box/product-dialog-box.component';
import { CategoryService } from 'src/app/@core/services/category.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css'],
})
export class ShowItemComponent implements OnInit {
  productId: string;
  product: Product;

  constructor(
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params.id;
    });
  }

  ngOnInit(): void {
    this.inventoryService
      .getDataByID(this.productId)
      .subscribe((data: Product) => {
        this.product = data;
      });
  }

  print() {
    window.print();
  }

  openDialog(action: string) {
    this.categoryService.get().subscribe((categories) => {
      let obj = { action: action, categories: categories, ...this.product };
      const dialogRef = this.dialog.open(ProductDialogBoxComponent, {
        height: '80vh',
        width: '50vw',
        data: obj,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.event === 'Update') {
          this.updateData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteData(result.data);
        }
      });
    });
  }

  updateData(product: Product): void {
    product.modifiedAt = new Date();

    this.inventoryService
      .updateItem(product)
      .subscribe((data: Product) => (this.product = data));
  }

  deleteData(productId: { id: string }) {
    this.inventoryService.deleteItem(productId.id.toString()).subscribe(() => {
      this.router.navigate(['./menu']);
    });
  }
}
