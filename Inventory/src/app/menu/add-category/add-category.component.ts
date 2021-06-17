import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/@core/services/category.service';
import { Category } from 'src/app/@core/entities/category';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  itemId: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    let item = new Category({
      ...this.addCategoryForm.value,
      modifiedAt: new Date(),
      active: true,
      user: this.authenticationService.getUserName(),
    });
    console.log(item);
    this.categoryService.add(item).subscribe(() => {
      this.addCategoryForm.reset();
      this.initForm();
    });
  }

  private initForm() {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.maxLength(200)),
      subCategories: new FormControl([]),
      createdAt: new FormControl('', Validators.required),
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addCategoryForm.controls[controlName].hasError(errorName);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addCategoryForm.value.subCategories.push(value);
    }

    event.input.value = '';
  }

  remove(tag: string): void {
    const index = this.addCategoryForm.value.subCategories.indexOf(tag);

    if (index >= 0) {
      this.addCategoryForm.value.subCategories.splice(index, 1);
    }
  }
}
