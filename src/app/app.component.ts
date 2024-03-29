import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabsComponent } from './components/tabs/tabs.component';

import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { selectHandlerSearch } from './components/select/select-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  readonly items = [
    'Graham Chapman',
    'John Cleese',
    'Terry Gilliam',
    'Eric Idle',
    'Terry Jones',
    'Michael Palin',
  ];
  readonly number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  stringify(product: any) {
    return `${product.id}.  ${product.title}`;
  }

  readonly context!: { $implicit: number };
  asyncSearch: selectHandlerSearch<any> = ({ page, capacity, query }) => {
    return this.http
      .get('https://dummyjson.com/products/search', {
        params: new HttpParams({
          fromObject: { q: query!.value || '' },
        }),
      })
      .pipe(
        map((res: any) => {
          return {
            options: res.products,
            metadata: {
              pageNumber: res.skip,
              pageCapacity: res.limit,
              total: res.total,
            },
          };
        })
      );
  };
}
