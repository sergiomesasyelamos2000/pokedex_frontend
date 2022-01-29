import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserDto } from 'src/app/shared/dtos/user/user-get.dto';
import { UserService } from '../user.service';

/**
 * Component to show all user list using component UserRow
 * @see {@link user-row.component}
 */

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  public usersListObservable: Observable<GetUserDto[]> =
    this.userService.findAll();
  public usersList: GetUserDto[] = [];

  constructor(
    private readonly userService: UserService<GetUserDto>,
    private readonly router: Router,
  ) {
    this.setUsersList();
  }

  /**
   * Navigate to component user-detail
   * @param id User id
   * @see {@link user-detail.component}
   */
  public showUserDetail(id: string): void {
    this.router.navigate(['user', id]);
  }

  /**
   * Delete user from db and updates user list
   * @param id User id
   */
  public deleteUser(id: string): void {
    this.userService
      .delete(parseInt(id))
      .subscribe((data) => this.setUsersList());
  }

  /**
   * Sets user list
   */
  private setUsersList(): void {
    this.usersListObservable.subscribe(
      (usersList) => (this.usersList = usersList),
    );
  }
}
