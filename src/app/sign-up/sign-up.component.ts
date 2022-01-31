import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../pokemon/pokemon.service';
import { InputModel } from '../shared/components/input/model/input.model';
import { CreatePokemonDto } from '../shared/dtos/pokemon/pokemon-create.dto';
import { Pokemon } from '../shared/interface/user.model';
import { InputService } from '../shared/services/input.service';
import { NotificationsService } from '../shared/services/notifications.service';
import { resetFrom } from '../shared/Utils';

/**
 * Allows pokemon registration
 */
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent {
  public formGroup = new FormGroup({});

  public emailInputControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  public passwordInputControl = new FormControl("", [Validators.required]);
  public nameInputControl = new FormControl("", [Validators.required]);
  public typeInputControl = new FormControl("", [Validators.required]);
  public abilityInputControl = new FormControl("", [Validators.required]);
  public speedInputControl = new FormControl("", [Validators.required]);
  public weightInputControl = new FormControl("", [Validators.required]);
  public heightInputControl = new FormControl("", [Validators.required]);
  public descriptionInputControl = new FormControl("", [Validators.required]);



  public emailInputModel: InputModel = this.inputService.getEmailInput(
    this.emailInputControl
  );
  public passwordInputModel: InputModel = this.inputService.getPasswordInput(
    this.passwordInputControl
  );
  public nameInputModel: InputModel = this.inputService.getNameInput(
    this.nameInputControl
  );
  public typeInputModel: InputModel = this.inputService.getTypeInput(
    this.typeInputControl
  );
  public abilityInputModel: InputModel = this.inputService.getAbilityInput(
    this.abilityInputControl
  );
  public speedInputModel: InputModel = this.inputService.getSpeedInput(
    this.speedInputControl
  );
  public weightInputModel: InputModel = this.inputService.getWeightInput(
    this.weightInputControl
  );
  public heightInputModel: InputModel = this.inputService.getHeightInput(
    this.heightInputControl
  );
  public descriptionInputModel: InputModel = this.inputService.getDescriptionInput(
    this.descriptionInputControl
  );




  constructor(
    private readonly pokemonService: PokemonService<Pokemon>,
    private readonly notificationService: NotificationsService,
    private readonly inputService: InputService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      email: this.emailInputControl,
      password: this.passwordInputControl,
      name: this.nameInputControl,
      type: this.typeInputControl,
      ability: this.abilityInputControl,
      speed: this.speedInputControl,
      weight: this.weightInputControl,
      height: this.heightInputControl,
      description: this.descriptionInputControl
    });
  }

  /**
   * Register pokemon on db with data from form
   */
  public signUp(): void {
    let newPokemon: CreatePokemonDto = new CreatePokemonDto();
    newPokemon = { ...newPokemon, ...this.formGroup.getRawValue() };
    this.pokemonService.create(newPokemon).subscribe((data) => {
      resetFrom(this.formGroup);
      this.notificationService.showCompossedSuccessNotification(
        "success.database.generic.pokemon",
        {
          action: "success.database.action.created",
        }
      );
      this.router.navigate([environment.url.components.pokemons]);
    });
  }

  /**
   * Navigate to login
   */
  public goLogin(): void {
    this.router.navigate([environment.url.components.login]);
  }
}
