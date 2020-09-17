import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryItem } from '../../app-logic/inventory-item';
import { Router } from '@angular/router';
import { InventoryService } from '../../app-logic/inventory-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  item: InventoryItem;
  itemId: string;
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: Router
  ) {
    this.itemId = '5f47cbabc6565122e45e70aa';
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
    this.item = new InventoryItem(this.addItemForm.value);
    this.item.modifiedAt = new Date();
    this.item.active = true;

    this.inventoryService.addItem(this.item).subscribe((data) => {
      let item: InventoryItem = new InventoryItem(data);
      this.itemId = item.id;
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addItemForm.controls[controlName].hasError(errorName);
  }
}
