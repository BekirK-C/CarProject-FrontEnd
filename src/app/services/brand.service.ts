import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44368/api/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath=this.apiUrl+'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  getById(brandId:number):Observable<ListResponseModel<Brand>> {
    let newPath=this.apiUrl+'brands/getbrand?id='+brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'brands/add',brand)
  }
  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'brands/update',brand)
  }
}
