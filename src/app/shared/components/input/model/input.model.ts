import { FormControl } from '@angular/forms';

export interface InputModel {
  type: string;
  label: string;
  placeholder: string;
  formControl: FormControl;
}
