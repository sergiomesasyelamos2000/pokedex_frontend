import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessTokenDto } from '../shared/dtos/auth/access-token.dto';
import { UserLoginDto } from '../shared/dtos/user/user-login.dto';
import { CrudException } from '../shared/error/type/CrudException';

/**
 * Service for login.component
 * @see {@link login.component}
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiEndpointUrl: string = `${environment.environment_api.local}${environment.url.api.base}${environment.url.api.login}`;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Try login a user with data passed in loginUser
   * @param {UserLoginDto} loginUser Data to try login a user
   * @return {Observable<AccessTokenDto>} Auth Token provided by bakend
   * @see {@link user-login.dto}
   * @see {@link access-token.dto}
   */
  public login(loginUser: UserLoginDto): Observable<AccessTokenDto> {
    return this.httpClient
      .post<AccessTokenDto>(this.apiEndpointUrl, loginUser)
      .pipe(
        catchError((error) => {
          throw new CrudException(error.status, 'error.login.generic');
        }),
      );
  }
}
