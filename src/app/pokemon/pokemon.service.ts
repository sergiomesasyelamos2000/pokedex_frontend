import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CrudService } from '../shared/services/crud.service';

/**
 * Crud service for all Pokemon/ components
 * @see {@link crud.service}
 */
@Injectable({
  providedIn: 'root',
})
export class PokemonService<Pokemon> extends CrudService<Pokemon> {
  private enviromentApi: string = environment.environment_api.local;
  private pokemonsEndpoint: string = environment.url.api.pokemons;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setErrorType('error.database.type.pokemon');
    this.setApiCrudEndpointUrl(this.enviromentApi, this.pokemonsEndpoint);
  }
}
