import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * Default component showed if a user access to a none valid URL
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private readonly router: Router) {}

  /**
   * Navigate to login
   */
  public returnToLogin(): void {
    this.router.navigate([environment.url.components.login]);
  }
}
