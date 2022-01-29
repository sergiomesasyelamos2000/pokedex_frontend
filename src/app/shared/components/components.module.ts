import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared.module';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
