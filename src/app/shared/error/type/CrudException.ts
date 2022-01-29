/**
 * Custom error to handle all CRUD exceptions
 * @param {string} status Error status
 * @param {string} message Template translation string to composs message
 * @param {string} [action] Crud action translation string to composs message
 * @param {string} [type] Entity type translation string to composs message
 * @param {string} [propertieName] Propertie name to composs message
 * @param {string} [propertieValue] Propertie value to composs message
 * @class
 */
export class CrudException extends Error {
  public status: string;
  public action?: string;
  public type?: string;
  public propertieName?: string;
  public propertieValue?: string;
  public override message: string;

  constructor(
    status: string,
    message: string,
    action?: string,
    type?: string,
    propertieName?: string,
    propertieValue?: string,
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.action = action;
    this.type = type;
    this.propertieName = propertieName;
    this.propertieValue = propertieValue;
  }
}
