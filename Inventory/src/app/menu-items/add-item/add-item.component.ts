import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product as Product } from '../../app-logic/product';
import { Router } from '@angular/router';
import { InventoryService } from '../../app-logic/inventory-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  item: Product;
  itemId: string;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: Router
  ) {
    this.itemId = '';
  }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(100)],
      user: ['', Validators.required],
      location: ['', Validators.required],
      inventoryNumber: ['', Validators.required],
      createdAt: ['', Validators.required],
    });
  }

  onSubmit() {
    this.item = new Product(this.addItemForm.value);
    this.item.modifiedAt = new Date();
    this.item.active = true;

    this.inventoryService.addItem(this.item).subscribe((data) => {
      let item: Product = new Product(data);
      this.itemId = item.id;
      console.log(this.itemId);
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addItemForm.controls[controlName].hasError(errorName);
  }
}
