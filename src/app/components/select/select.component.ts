import {
  BehaviorSubject,
  Observable,
  debounce,
  debounceTime,
  filter,
  finalize,
  last,
  map,
  of,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { __values } from 'tslib';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  TuiLetModule,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';

import { LoadTriggerComponent } from './load-trigger.component';
import { selectHandlerSearch } from './select-api';
import { FormControlWrapper } from './form-control-wrapper.directive';

@Component({
  selector: 'ma-ui-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiLetModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLoaderModule,
    LoadTriggerComponent,
    ScrollingModule,
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent<T> extends FormControlWrapper implements OnInit {
  isEmpty = false;
  cdr = inject(ChangeDetectorRef);
  list$ = new BehaviorSubject<T[]>([]);
  loading$ = new BehaviorSubject(true);
  errorStatus = false;
  options: null | T[] = null;
  search$ = new BehaviorSubject<null | string>(null);
  searchParams = {
    capacity: new BehaviorSubject<number>(10),
    page: new BehaviorSubject<number>(1),
    query: new BehaviorSubject<string | null>(null),
  };

  @Input() asyncSearch = false;

  @Input() multiple = false;
  @Input() size: 's' | 'm' | 'l' = 'm';
  @Input({ required: false }) set items(items: T[] | Observable<T[]>) {
    if (items instanceof Observable) {
      items.subscribe({
        next: (data) => {
          this.options = data;
          this.search$.next(null);
        },
        error: (err) => {
          console.warn(err);
          this.errorStatus = true;
          this.options = [];
          this.search$.next(null);
        },
      });
    } else {
      this.options = items;
    }
  }
  @Input() stringify: TuiStringHandler<T> = (item: T): string => {
    return String(item);
  };
  @Input() handlerSearch!: selectHandlerSearch<T>;

  options$ = this.search$.pipe(
    debounceTime(1000),
    tap((res) => {
      this.searchParams.page.next(1);
      this.searchParams.query.next(res);
      return this.handlerSearch(this.searchParams).subscribe((res: any) => {
        console.log(res);
        this.list$.next([...res.options]);
        this.options = this.list$.value;
        this.isEmpty = false;
      });
    }),
    switchMap((search) => {
      console.log(search, 'asdkjads');

      return of(this.options).pipe(
        map((items) => {
          if (items === null) return items;
          return items.filter((item) => {
            return TUI_DEFAULT_MATCHER(item, search ?? '', this.stringify);
          });
        }),
        startWith(null)
      );
    })
  );

  options2$ = this.search$
    .pipe(
      tap((res) => {
        if (this.handlerSearch) {
          this.handlerSearch(this.searchParams).subscribe();
        }
      }),
      tap(() => {})
    )
    .subscribe();

  appendList() {
    if (this.handlerSearch) {
      this.handlerSearch(this.searchParams)
        .pipe(
          tap((res) => {
            if (
              res.metadata.total <=
              this.searchParams.page.value * this.searchParams.capacity.value
            ) {
              this.isEmpty = true;
            }
          }),
          map((res) => this.list$.next([...this.list$.value, ...res.options])),
          tap(() => {
            this.options = this.list$.value;
            this.search$.next(this.search$.value),
              this.searchParams.page.next(this.searchParams.page.value + 1);
            this.loading$.next(false);
          })
        )
        .subscribe();
    }
  }

  loadTriggerEventHandler(): void {
    this.appendList();
    this.loading$.next(true);
    this.cdr.detectChanges();
  }

  @Input() disabledItemHandler: (item: T) => boolean = () => false;
  override ngOnInit() {
    super.ngOnInit();
    this.appendList();
    this.items;
  }
}
