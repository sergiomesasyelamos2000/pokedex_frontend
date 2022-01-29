import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/service/auth.service";
import { InputModel } from "../shared/components/input/model/input.model";
import { UserLoginDto } from "../shared/dtos/user/user-login.dto";
import { InputService } from "../shared/services/input.service";
import { NotificationsService } from "../shared/services/notifications.service";
import { resetFrom, saveAccessToken } from "../shared/Utils";
import { LoginService } from "./login.service";

/**
 * Main component on users can try login
 */
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public formGroup = new FormGroup({});
  public emailInputControl = new FormControl("", Validators.required);
  public passwordInputControl = new FormControl("", Validators.required);

  public emailInputModel: InputModel = this.inputService.getEmailInput(
    this.emailInputControl
  );
  public passwordInputModel: InputModel = this.inputService.getPasswordInput(
    this.passwordInputControl
  );

  constructor(
    private readonly loginService: LoginService,
    private readonly notificationService: NotificationsService,
    private readonly authService: AuthService,
    private readonly inputService: InputService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      email: this.emailInputControl,
      password: this.passwordInputControl,
    });
  }

  /**
   * Try login a user an if succes saves accessToken into sessionStorage and auth.service
   * @see {@link auth.service}
   * @see {@link utils} saveAccessToken
   */
  public login(): void {
    const loginUser: UserLoginDto = { ...this.formGroup.getRawValue() };
    this.loginService.login(loginUser).subscribe((token) => {
      let { accessToken } = token;
      resetFrom(this.formGroup);
      saveAccessToken(accessToken);
      this.authService.accessToken = accessToken;
      this.router.navigate([environment.url.components.users]);
    });
  }

  /**
   * Navigate inside
   */
  public goSignUp(): void {
    this.router.navigate([environment.url.components.sign_up]);
  }
}
