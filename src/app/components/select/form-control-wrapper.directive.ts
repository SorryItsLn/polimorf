import { Subscription } from 'rxjs'

import {
  ChangeDetectorRef,
  Directive,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  NgControl,
  NgModel,
} from '@angular/forms'
import { EMPTY_FUNCTION } from '@taiga-ui/cdk'

@Directive()
export class FormControlWrapper
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscriptions: Subscription[] = []
  private onChange = EMPTY_FUNCTION
  private onTouched = EMPTY_FUNCTION

  constructor(
    @Optional() @Self() @Inject(NgControl) public ngControl: NgControl | null,
    protected changeDetectorRef: ChangeDetectorRef | null,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this
    }
  }

  private _control!: FormControl

  get control(): FormControl {
    return this._control
  }

  writeValue() {
    if (this.changeDetectorRef) {
      this.changeDetectorRef.markForCheck()
    }
    if (this.control) {
      this.control.markAsTouched()
      this.control.markAsDirty()
    }
  }

  registerOnTouched(fn: typeof this.onChange): void {
    this.onTouched = fn
  }

  registerOnChange(fn: typeof this.onTouched) {
    this.onChange = fn
  }

  ngOnInit() {
    if (
      this.ngControl instanceof FormControlDirective ||
      this.ngControl instanceof FormControlName
    ) {
      this._control = this.ngControl.control
    } else if (this.ngControl instanceof NgModel) {
      this._control = this.ngControl.control
      const subscription = this._control.valueChanges.subscribe(value => {
        if (
          (
            this.ngControl?.control as unknown as {
              _pendingChange: boolean
            }
          )._pendingChange
        ) {
          this.ngControl?.viewToModelUpdate(value)
        }
      })
      this.subscriptions.push(subscription)
    } else {
      this._control = new FormControl()
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
