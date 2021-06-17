import { Component, Inject, OnInit, Optional } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/@core/entities/category';
import { Product } from '../../@core/entities/product';

@Component({
  selector: 'app-product-dialog-box',
  templateUrl: './product-dialog-box.component.html',
  styleUrls: ['./product-dialog-box.component.css'],
})
export class ProductDialogBoxComponent implements OnInit {
  action: string;
  receivedData: any;
  public categories: Category[] = [];
  public updateForm: FormGroup; 
  public selectedCategory: Category = new Category();

  constructor(   
    private dialogRef: MatDialogRef<ProductDialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.receivedData = { ...data };   
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(this.receivedData.id),
      name: new FormControl(this.receivedData.name),
      description: new FormControl(this.receivedData.description),
      price: new FormControl(this.receivedData.price),
      priceDeal: new FormControl(this.receivedData.priceDeal),
      quantity: new FormControl(this.receivedData.quantity),
      brand: new FormControl(this.receivedData.brand),     
      subCategory: new FormControl(this.receivedData.subCategory),
      location: new FormControl(this.receivedData.location),
      tags: new FormControl(this.receivedData.tags),
      inventoryNumber: new FormControl(this.receivedData.inventoryNumber),
      active: new FormControl(this.receivedData.active),
    });
    this.action = this.receivedData.action;
    this.categories = this.receivedData.categories;
    this.selectedCategory = this.categories.find(category => category.name === this.receivedData.category)!;   
  } 

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.updateForm.value });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
