import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = 'http://localhost:3000/products';
  apiAuth = 'http://localhost:3000';
  http = inject(HttpClient);

  getAll() {
    return this.http.get<IProduct[]>(this.api);
  }
  getOne(id: string) {
    return this.http.get<IProduct>(`${this.api}/${id}`);
  }
  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  update(id: string, data: any) {
    return this.http.patch(`${this.api}/${id}`, data);
  }
  add(data: any) {
    return this.http.post(this.api, data);
  }
  signin(data: any) {
    return this.http.post(`${this.apiAuth}/signin`, data);
  }
  signup(data: any) {
    return this.http.post(`${this.apiAuth}/signup`, data);
  }
}
