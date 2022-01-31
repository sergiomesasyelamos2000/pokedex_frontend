import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetPokemonDto } from 'src/app/shared/dtos/pokemon/pokemon-get.dto';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../pokemon.service';

/**
 * Component to show all pokemon list using component PokemonRow
 * @see {@link pokemon-row.component}
 */

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  public pokemonsListObservable: Observable<GetPokemonDto[]> =
    this.pokemonService.findAll();
  public pokemonsList: GetPokemonDto[] = [];

  constructor(
    private readonly pokemonService: PokemonService<GetPokemonDto>,
    private readonly router: Router,
  ) {
    this.setPokemonsList();
  }

  /**
   * Navigate to component pokemon-detail
   * @param id Pokemon id
   * @see {@link pokemon-detail.component}
   */
  public showPokemonDetail(id: string): void {
    this.router.navigate(['pokemon', id]);
  }

  /**
   * Delete pokemon from db and updates pokemon list
   * @param id pokemon id
   */
  public deletePokemon(id: string): void {
    this.pokemonService
      .delete(parseInt(id))
      .subscribe((data) => this.setPokemonsList());
  }

  /**
   * Sets pokemon list
   */
  private setPokemonsList(): void {
    this.pokemonsListObservable.subscribe(
      (pokemonsList) => (this.pokemonsList = pokemonsList),
    );
  }
}
