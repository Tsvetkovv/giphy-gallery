import { Component, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchBoxComponent,
      multi: true,
    },
  ],
})
export class SearchBoxComponent implements ControlValueAccessor {
  @Output() reset = new EventEmitter();

  onChange?: (val: string) => void;
  disabled: boolean = false;
  value: string = '';

  writeValue(value: string) {
    this.value = value;
  }
  registerOnChange(fn: (val: string) => void) {
    this.onChange = fn;
  }
  registerOnTouched() {}

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
