import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Category } from '../entities/category.entity';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

  public getAll(): Observable<Category[]> {
    return this.httpService.get('sirhood/categories');
  }
}
