import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { InputModel } from 'src/app/shared/components/input/model/input.model';
import { UpdatePokemonDto } from 'src/app/shared/dtos/pokemon/pokemon-update.dto';
import { Pokemon } from 'src/app/shared/interface/user.model';
import { InputService } from 'src/app/shared/services/input.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { encrypt } from 'src/app/shared/Utils';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../pokemon.service';

/**
 * Component to show pokemon selected info and updated
 */
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  private pokemonId = 0;
  private originalPokemon?: any;

  public pokemon?: Pokemon;
  public formGroup = new FormGroup({});

  public emailInputControl?: FormControl;
  public passwordInputControl?: FormControl;
  public nameInputControl?: FormControl;
  public typeInputControl?: FormControl;
  public abilityInputControl?: FormControl;
  public speedInputControl?: FormControl;
  public weightInputControl?: FormControl;
  public heightInputControl?: FormControl;
  public descriptionInputControl?: FormControl;
  public imgInputControl?: FormControl;


  public emailInputModel?: InputModel;
  public passwordInputModel?: InputModel;
  public nameInputModel?: InputModel;
  public typeInputModel?: InputModel;
  public abilityInputModel?: InputModel;
  public speedInputModel?: InputModel;
  public weightInputModel?: InputModel;
  public heightInputModel?: InputModel;
  public descriptionInputModel?: InputModel;
  public imgInputModel?: InputModel;

  constructor(
    private readonly pokemonService: PokemonService<Pokemon>,
    private readonly inputService: InputService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly notificationService: NotificationsService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.pokemonId = params['id'];
      this.pokemonService
        .findByPropertie(`id:${this.pokemonId}`)
        .pipe(
          catchError((error) => {
            this.location.back();
            throw new Error();
          }),
        )
        .subscribe((pokemon) => {
          this.pokemon = pokemon;
          this.originalPokemon = pokemon;
          this.buildForm();
        });
    });
  }

  /**
   * Build form and fill it with user data recovered from db
   */
  private buildForm() {
    this.emailInputControl = new FormControl(this.pokemon?.email, [
      Validators.email,
    ]);
    this.passwordInputControl = new FormControl('', []);
    this.nameInputControl = new FormControl(this.pokemon?.name, []);
    this.typeInputControl = new FormControl(this.pokemon?.type, []);
    this.abilityInputControl = new FormControl(this.pokemon?.ability, []);
    this.speedInputControl = new FormControl(this.pokemon?.speed, []);
    this.weightInputControl = new FormControl(this.pokemon?.weight, []);
    this.heightInputControl = new FormControl(this.pokemon?.height, []);
    this.descriptionInputControl = new FormControl(this.pokemon?.description, []);
    this.imgInputControl = new FormControl(this.pokemon?.img, []);

    this.formGroup = new FormGroup({
      email: this.emailInputControl,
      password: this.passwordInputControl,
      name: this.nameInputControl,
      type: this.typeInputControl,
      ability: this.abilityInputControl,
      speed: this.speedInputControl,
      weight: this.weightInputControl,
      height: this.heightInputControl,
      description: this.descriptionInputControl,
      img: this.imgInputControl
    });

    this.emailInputModel = this.inputService.getEmailInput(this.emailInputControl);
    this.passwordInputModel = this.inputService.getPasswordInput(this.passwordInputControl);
    this.nameInputModel = this.inputService.getNameInput(this.nameInputControl);
    this.typeInputModel = this.inputService.getTypeInput(this.typeInputControl);
    this.abilityInputModel = this.inputService.getAbilityInput(this.abilityInputControl);
    this.speedInputModel = this.inputService.getSpeedInput(this.speedInputControl);
    this.weightInputModel = this.inputService.getWeightInput(this.weightInputControl);
    this.heightInputModel = this.inputService.getHeightInput(this.heightInputControl);
    this.descriptionInputModel = this.inputService.getDescriptionInput(this.descriptionInputControl);
    this.imgInputModel = this.inputService.getImgInput(this.imgInputControl);
    
  }

  /**
   * Update user data in db with data changed in form
   */
  public updatePokemon(): void {
    let updatedPokemon: any = new UpdatePokemonDto();
    updatedPokemon = { ...updatedPokemon, ...this.formGroup.getRawValue() };

    /**
     * Remove data not changed
     */
    Object.keys(updatedPokemon).forEach((propertie) => {
      if (
        updatedPokemon[propertie] === this.originalPokemon[propertie] ||
        updatedPokemon[propertie] === ''
      ) {
        delete updatedPokemon[propertie];
      }
    });
    if (updatedPokemon.password) {
      updatedPokemon.password = encrypt(updatedPokemon.password);
    }

    this.pokemonService
      .update(this.pokemonId, updatedPokemon)
      .subscribe((response) =>
        this.notificationService.showCompossedSuccessNotification(
          'success.database.generic.pokemon',
          { action: 'success.database.action.update' },
        ),
      );
  }

  /**
   * Navigate to pokemon-list 
   */
   public goPokemonList(): void {
    this.router.navigate([environment.url.components.pokemons]);
  }
}
