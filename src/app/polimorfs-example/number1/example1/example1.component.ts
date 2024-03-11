import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrl: './example1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example1Component<T> {
  readonly context!: { $implicit: number };

  constructor() {}
  @Input()
  content: PolymorpheusContent<unknown>;

  getContext($implicit: T) {
    console.log($implicit);

    return { $implicit };
  }
}
