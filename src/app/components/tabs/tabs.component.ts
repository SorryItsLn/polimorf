import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { ContextWithActive } from '../../types/interfaces';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent<T> {}
