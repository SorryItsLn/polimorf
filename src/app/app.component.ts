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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('template') template?: string;

  @ViewChild('templateWithType') templateWithType?: TemplateRef<unknown>;

  component = new PolymorpheusComponent(TabsComponent);
  readonly items = [
    'Graham Chapman',
    'John Cleese',
    'Terry Gilliam',
    'Eric Idle',
    'Terry Jones',
    'Michael Palin',
  ];
  readonly number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  readonly context!: { $implicit: number };
}
