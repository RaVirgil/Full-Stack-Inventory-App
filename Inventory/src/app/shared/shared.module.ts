import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDialogBoxComponent } from './product-item-dialog-box/product-dialog-box.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NotFoundComponent } from './not-found/not-found.component';

import { CategoryDialogBoxComponent } from './category-dialog-box/category-dialog-box.component';
import { ChipInputComponent } from './chip-input/chip-input.component';

@NgModule({
  declarations: [ProductDialogBoxComponent, ShowItemComponent, NotFoundComponent, CategoryDialogBoxComponent, ChipInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    ZXingScannerModule,
    
  ],
  exports: [
    ProductDialogBoxComponent,
    ShowItemComponent,
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    ZXingScannerModule,
    NotFoundComponent,   
    ChipInputComponent
  ],
})
export class SharedModule {}
