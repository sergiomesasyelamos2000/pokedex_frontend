import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetPokemonDto } from 'src/app/shared/dtos/pokemon/pokemon-get.dto';

/**
 * Generic component to show pokemon data using a GetPokemonDto as data source
 * @see {@link pokemon-get.dto}
 */

@Component({
  selector: 'app-pokemon-row',
  templateUrl: './pokemon-row.component.html',
  styleUrls: ['./pokemon-row.component.scss'],
})
export class PokemonRowComponent {
  private _pokemon: GetPokemonDto = {
    id: '',
    name: '',
    type: '',
    email: '',
    ability: '',
    speed: '',
    weight: '',
    height: '',
    description: '',
    img: ''
  };

  @Input() set pokemon(pokemon: GetPokemonDto) {
    this._pokemon = pokemon;
  }

  @Output() showEmmiter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEmmiter: EventEmitter<string> = new EventEmitter<string>();

  get pokemon(): any {
    return this._pokemon;
  }

  public showViewUser(): void {
    this.showEmmiter.emit(this.pokemon.id);
  }

  public showUserDetail(): void {
    this.showEmmiter.emit(this.pokemon.id);
  }

  public deleteUser(): void {
    this.deleteEmmiter.emit(this.pokemon.id);
  }
}
