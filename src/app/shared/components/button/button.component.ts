import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Generic component to instanciate a button element
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() form?: FormGroup;
}
