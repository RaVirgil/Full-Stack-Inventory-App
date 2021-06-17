import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  public tables: String[] = ["Products", "Categories"];
  public table = 'Products';  
}
