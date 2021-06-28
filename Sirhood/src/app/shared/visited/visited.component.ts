import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';
import { VisitedService } from 'src/app/@core/services/visited.service';

@Component({
  selector: 'app-visited',
  templateUrl: './visited.component.html',
  styleUrls: ['./visited.component.css']
})
export class VisitedComponent implements OnInit {
  public visitedProducts: Product[] = [];

  constructor(private readonly visitedService: VisitedService) { }

  ngOnInit(): void {
    this.visitedService.visited$.subscribe((visited: Product[]) => {
      this.visitedProducts = visited;    
    });
  }

}
