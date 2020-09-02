import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryItem } from '../../app-logic/inventory-item';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  item: InventoryItem;
  itemId: number;
  constructor(
    private fb: FormBuilder,
    private inventoryListMockServie: InventoryListMockService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params =>{
      this.itemId = params['id'] ? params['id']: 0;
    });
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
    this.item.deleted = false;
    this.item.id = this.inventoryListMockServie.getLastId() + 1;
    this.inventoryListMockServie.addData(this.item);
    this.route.navigate(['/inventory']);
  }

  hasError(controlName:string, errorName: string){
    return this.addItemForm.controls[controlName].hasError(errorName);
  }
}
