import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(products : any[], searchText : string) : any[] {
    if(!products) return [];
    if(!searchText) return products;
    searchText = searchText.toLowerCase();
    return products.filter(it => {
      return it.product_name.toLowerCase().includes(searchText) || it.product_category.toLowerCase().includes(searchText);
    });
  }
}
