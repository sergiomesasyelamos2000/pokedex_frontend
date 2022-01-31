import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonRowComponent } from './pokemon-list/pokemon-row/pokemon-row.component';
import { PokemonService } from './pokemon.service';


@NgModule({
  providers: [PokemonService],
  declarations: [PokemonListComponent, PokemonRowComponent, PokemonDetailComponent],
  exports: [PokemonListComponent, PokemonRowComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, MaterialModule],
})
export class PokemonModule {}
