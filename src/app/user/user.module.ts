import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRowComponent } from './user-list/user-row/user-row.component';
import { UserService } from './user.service';

@NgModule({
  providers: [UserService],
  declarations: [UserListComponent, UserRowComponent, UserDetailComponent],
  exports: [UserListComponent, UserRowComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, MaterialModule],
})
export class UserModule {}
