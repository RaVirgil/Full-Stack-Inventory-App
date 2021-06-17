import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/@core/entities/category';

@Component({
  selector: 'app-category-dialog-box',
  templateUrl: './category-dialog-box.component.html',
  styleUrls: ['./category-dialog-box.component.css'],
})
export class CategoryDialogBoxComponent implements OnInit {
  action: string;
  receivedData: any;
  public updateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.receivedData = { ...data };
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(this.receivedData.id),
      name: new FormControl(this.receivedData.name),
      type: new FormControl(this.receivedData.type),
      subCategories: new FormControl(this.receivedData.subCategories),
      active: new FormControl(this.receivedData.active),
    });
    this.action = this.receivedData.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.updateForm.value });
  }

  public addSubcategory(subCategory: string): void {
    this.updateForm.value.subCategories.push(subCategory);
  }

  public deleteSubcategory(subCategory: string): void {
    console.log(subCategory);
    const index = this.updateForm.value.subCategories.findIndex(
      (element: string) => element === subCategory
    );     

    if (index > -1) this.updateForm.value.subCategories.splice(index, 1);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
