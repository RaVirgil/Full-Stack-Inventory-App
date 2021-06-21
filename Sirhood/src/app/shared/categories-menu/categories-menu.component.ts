import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/@core/entities/category.entity';
import { CategoryService } from 'src/app/@core/services/category.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css'],
})
export class CategoriesMenuComponent implements OnInit {
  public categories: Category[] =[];
  private timedOutCloser: any;

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);    
  }

  mouseEnter(trigger: any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();  
  }

  mouseLeave(trigger: any) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 300);
  }
}
