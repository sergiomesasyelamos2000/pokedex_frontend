import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

/**
 * Class names for snackbars
 * @enum
 */
enum snackBarClasses {
  ERROR_CLASS = 'error-snackbar',
  WARNING_CLASS = 'warning-snackbar',
  SUCCESS_CLASS = 'success-snackbar',
}

@Injectable({
  providedIn: 'root',
})
/**
 * Notify user actions completed or failed with snackbars
 * @class
 */
export class NotificationsService {
  constructor(
    private snackBar: MatSnackBar,
    private readonly translateService: TranslateService,
  ) {}

  /**
   * Open snackbar with message and color passed throw params
   * @param {string} message Message to show
   * @param {string} snackBarClass Class for the snackbar
   */
  private showNotification(message: string, snackBarClass: string): void {
    this.snackBar.open(message, '', {
      duration: 1500,
      panelClass: [snackBarClass],
    });
  }

  /**
   * Translate compossed message and calls show notification with succes class
   * @param {string} template Message template
   * @param {any} [variables] Template vars to composs message
   */
  public showCompossedSuccessNotification(
    template: string,
    variables?: any,
  ): void {
    variables = variables ? this.translateVariables(variables) : null;
    const translation = this.translateService.instant(template, variables);
    this.showNotification(translation, snackBarClasses.SUCCESS_CLASS);
  }

  /**
   * Translate compossed message and calls show notification with error class
   * @param {string} template Message template
   * @param {any} [variables] Template vars to composs message
   */
  public showCompossedErrorNotification(
    template: string,
    variables?: any,
  ): void {
    variables = variables ? this.translateVariables(variables) : null;
    const translation = this.translateService.instant(template, variables);
    this.showNotification(translation, snackBarClasses.ERROR_CLASS);
  }

  /**
   * Translate all object variables
   * @param {any} variables Variables to translate
   * @return {string} Translated variables
   */
  private translateVariables(variables: any): any {
    Object.keys(variables).forEach(
      (propertie) =>
        (variables[propertie] = this.translateService.instant(
          variables[propertie],
        )),
    );
    return variables;
  }
}
