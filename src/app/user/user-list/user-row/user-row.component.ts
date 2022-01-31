import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetUserDto } from 'src/app/shared/dtos/user/user-get.dto';

/**
 * Generic component to show user data using a GetUserDto as data source
 * @see {@link user-get.dto}
 */

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent {
  private _user: GetUserDto = {
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

  @Input() set user(user: GetUserDto) {
    this._user = user;
  }

  @Output() showEmmiter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEmmiter: EventEmitter<string> = new EventEmitter<string>();

  get user(): any {
    return this._user;
  }

  public showViewUser(): void {
    this.showEmmiter.emit(this.user.id);
  }

  public showUserDetail(): void {
    this.showEmmiter.emit(this.user.id);
  }

  public deleteUser(): void {
    this.deleteEmmiter.emit(this.user.id);
  }
}
