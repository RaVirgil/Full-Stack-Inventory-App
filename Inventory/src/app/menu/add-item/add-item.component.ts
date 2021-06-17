import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../@core/entities/product';
import { InventoryService } from '../../@core/services/inventory-service.service';
import { CategoryService } from 'src/app/@core/services/category.service';
import { Category } from 'src/app/@core/entities/category';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  public categories: Category[] = [];
  public selectedCategory: Category = new Category();

  constructor(
    private inventoryService: InventoryService,
    private readonly categoryService: CategoryService,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.categoryService.get().subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = categories[0];
    });
  }

  public onSubmit(): void {
    let item = new Product({
      ...this.addItemForm.value,
      modifiedAt: new Date(),
      active: true,
      user: this.authenticationService.getUserName(),
      category: this.selectedCategory.name,
    });
    console.log(item);
    this.inventoryService.addItem(item).subscribe(() => {
      this.addItemForm.reset();
      this.initForm();
    });
  }

  private initForm(): void {
    this.addItemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(200)),
      price: new FormControl('', Validators.required),
      priceDeal: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      location: new FormControl('', Validators.required),
      tags: new FormControl([]),
      inventoryNumber: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
    });
  }

  public addTag(tag: string): void {
    this.addItemForm.value.tags.push(tag);
  }

  public deleteTag(tag: string): void {
    const index = this.addItemForm.value.tags.findIndex(tag);

    if (index > -1) this.addItemForm.value.tags.splice(index, 1);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.addItemForm.controls[controlName].hasError(errorName);
  }
}
