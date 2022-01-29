import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputModel } from '../components/input/model/input.model';
import { InputType } from '../enums/input-type.enum';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to get InputModels
 * @see {@link input.model}
 * @class
 */
export class InputService {
  /**
   * @return {InputModel} name input model
   */
  public getNameInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.name',
      placeholder: 'input.placeholder.name',
      formControl: formControl,
    };
  }

  
  public getTypeInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.type',
      placeholder: 'input.placeholder.type',
      formControl: formControl,
    };
  }

  public getAbilityInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.ability',
      placeholder: 'input.placeholder.ability',
      formControl: formControl,
    };
  }

  public getSpeedInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.speed',
      placeholder: 'input.placeholder.speed',
      formControl: formControl,
    };
  }

  public getWeightInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.weight',
      placeholder: 'input.placeholder.weight',
      formControl: formControl,
    };
  }

  public getHeightInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.height',
      placeholder: 'input.placeholder.height',
      formControl: formControl,
    };
  }

  public getDescriptionInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.description',
      placeholder: 'input.placeholder.description',
      formControl: formControl,
    };
  }
  
  public getImgInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.img',
      placeholder: 'input.placeholder.img',
      formControl: formControl,
    };
  }

 





  /**
   * @return {InputModel} password input model
   */
  public getPasswordInput(formControl: FormControl): InputModel {
    return {
      type: InputType.PASSWORD,
      label: 'input.label.password',
      placeholder: 'input.placeholder.password',
      formControl: formControl,
    };
  }

  /**
   * @return {InputModel} email input model
   */
  public getEmailInput(formControl: FormControl): InputModel {
    return {
      type: InputType.EMAIL,
      label: 'input.label.email',
      placeholder: 'input.placeholder.email',
      formControl: formControl,
    };
  }
}
