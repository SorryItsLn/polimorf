import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'

@Component({
  selector: 'ma-ui-load-trigger',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class LoadTriggerComponent implements OnInit {
  @Output()
  readonly init = new EventEmitter()

  ngOnInit(): void {
    this.init.emit()
  }
}
