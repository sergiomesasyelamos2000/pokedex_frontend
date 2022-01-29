import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputType } from '../../enums/input-type.enum';
import { InputModel } from './model/input.model';

/**
 * Generic component to instanciate an input element using an InputModel as a template
 * @see {@link inputModel}
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() inputModel: InputModel = {
    type: InputType.TEXT,
    label: '',
    placeholder: '',
    formControl: new FormControl('', Validators.required),
  };

  constructor() {}
}
