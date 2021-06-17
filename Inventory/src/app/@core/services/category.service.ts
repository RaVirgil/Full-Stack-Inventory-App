import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../entities/category';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  get() {
    const headers = this.getHeaders();

    return this.http
      .get<Category[]>('api/inventory/categories/', { headers });
  }

  getSome(
    pageNumber = 1,
    pageSize = 5,
    activeOnly = false,
    sorting = ''
  ): Observable<[Category[] | null, number]> {
    let params = new HttpParams()
      .set('activeOnly', activeOnly ? 'true' : 'false')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (sorting) params = params.set('sort', sorting);

    const headers = this.getHeaders();

    return this.http
      .get<Category[]>('api/inventory/categories/some', {
        params: params,
        headers,
        observe: 'response',
      })
      .pipe(        
        map((resp) => {
          return [resp.body, Number(resp.headers.get('X-Count'))];
        })
      );
  }

  getById(itemId: string) {
    const headers = this.getHeaders();

    return this.http.get<Category>('api/inventory/categories/' + itemId, {
      headers,
    });
  }

  update(item: Category) {
    const headers = this.getHeaders();

    return this.http.put<Category>('api/inventory/categories/', item, {
      headers,
    });
  }

  delete(id: String) {
    const headers = this.getHeaders();

    return this.http.delete<Category>('api/inventory/categories/' + id, {
      headers,
    });
  }

  add(item: Category) {
    const headers = this.getHeaders();

    return this.http.post<Category>('api/inventory/categories/', item, {
      headers,
    });
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    if (token === null) return 'null';
    return token;
  }

  getHeaders(): any {
    const token = this.getToken();
    const headers = { Authorization: 'Bearer ' + token };
    return headers;
  }
}
