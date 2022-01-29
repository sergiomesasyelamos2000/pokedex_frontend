import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { InputModel } from 'src/app/shared/components/input/model/input.model';
import { UpdateUserDto } from 'src/app/shared/dtos/user/user-update.dto';
import { User } from 'src/app/shared/interface/user.model';
import { InputService } from 'src/app/shared/services/input.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { encrypt } from 'src/app/shared/Utils';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

/**
 * Component to show user selected info and updated
 */
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  private userId = 0;
  private originalUser?: any;

  public user?: User;
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
    private readonly userService: UserService<User>,
    private readonly inputService: InputService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly notificationService: NotificationsService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService
        .findByPropertie(`id:${this.userId}`)
        .pipe(
          catchError((error) => {
            this.location.back();
            throw new Error();
          }),
        )
        .subscribe((user) => {
          this.user = user;
          this.originalUser = user;
          this.buildForm();
        });
    });
  }

  /**
   * Build form and fill it with user data recovered from db
   */
  private buildForm() {
    this.emailInputControl = new FormControl(this.user?.email, [
      Validators.email,
    ]);
    this.passwordInputControl = new FormControl('', []);
    this.nameInputControl = new FormControl(this.user?.name, []);
    this.typeInputControl = new FormControl(this.user?.type, []);
    this.abilityInputControl = new FormControl(this.user?.ability, []);
    this.speedInputControl = new FormControl(this.user?.speed, []);
    this.weightInputControl = new FormControl(this.user?.weight, []);
    this.heightInputControl = new FormControl(this.user?.height, []);
    this.descriptionInputControl = new FormControl(this.user?.description, []);
    this.imgInputControl = new FormControl(this.user?.img, []);

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
  public updateUser(): void {
    let updatedUser: any = new UpdateUserDto();
    updatedUser = { ...updatedUser, ...this.formGroup.getRawValue() };

    /**
     * Remove data not changed
     */
    Object.keys(updatedUser).forEach((propertie) => {
      if (
        updatedUser[propertie] === this.originalUser[propertie] ||
        updatedUser[propertie] === ''
      ) {
        delete updatedUser[propertie];
      }
    });
    if (updatedUser.password) {
      updatedUser.password = encrypt(updatedUser.password);
    }

    this.userService
      .update(this.userId, updatedUser)
      .subscribe((response) =>
        this.notificationService.showCompossedSuccessNotification(
          'success.database.generic.user',
          { action: 'success.database.action.update' },
        ),
      );
  }

  /**
   * Navigate to user-list 
   */
   public goUserList(): void {
    this.router.navigate([environment.url.components.users]);
  }
}
