import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private productData = new BehaviorSubject<any>([]);
  currentData = this.productData.asObservable();
  private dataSource = new Subject<any>();
  
  constructor() { }

  sendProductData(data : any) {
    this.dataSource.next(data);
    this.productData.next(data);
  }

  getProductData() : Observable<any> {
    return this.dataSource.asObservable();
  }

}
