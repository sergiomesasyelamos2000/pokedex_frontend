import { Injectable } from "@angular/core";
import { recoverAccessToken, removeAccessToken } from "../../shared/Utils";

/**
 * Authentication service handles user access token
 * @class
 */
@Injectable()
export class AuthService {
  private _accessToken?: string;
  private _appLanguage: string = "es";

  public set accessToken(accessToken: string | undefined) {
    if (!accessToken) {
      removeAccessToken();
    }
    this._accessToken = accessToken;
  }

  public get accessToken() {
    return this._accessToken;
  }

  public set appLanguage(language: string) {
    this._appLanguage = language;
  }

  public get appLanguage(): string {
    return this._appLanguage;
  }

  constructor() {
    this.accessToken = recoverAccessToken() ?? undefined;
  }

  /**
   * Verify if user is logged in
   * @return {boolean} Access Token exists
   */
  public userIsLogged(): boolean {
    return this.accessToken !== undefined;
  }
}
