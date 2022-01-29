import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudServiceAbstract } from '../abstracts/crud.service.abstract';
import { CrudException } from '../error/type/CrudException';

/**
 * Generic service to implement crud functions
 * @template T type of entity handled by service
 */
export class CrudService<T> implements CrudServiceAbstract<T> {
  private apiUrl: string = environment.url.api.base;
  private apiCrudEndpoint: string = '';

  /**
   * Error translation literals
   *  */
  private errorType: string = '';
  private errorGeneric: string = 'error.database.generic';
  private errorActionCreate: string = 'error.database.action.create';
  private errorActionGet: string = 'error.database.action.get';
  private errorActionDelete: string = 'error.database.action.delete';
  private errorActionUpdate: string = 'error.database.action.update';

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get all entities of type T
   * @return {Observable<T[]>}
   * @throws {CrudException}
   *  */
  public findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiCrudEndpoint).pipe(
      catchError((error) => {
        throw new CrudException(
          error.status,
          this.errorGeneric,
          this.errorActionGet,
          this.errorType,
        );
      }),
    );
  }

  /**
   * Get the firt entity of type T with a propertie equals to sended propertie
   * @param {string} propertie Propertie for filter. Example: 'email:hello@world.com'
   * @return {Observable<T>}
   * @throws {CrudException}
   *  */
  public findByPropertie(propertie: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiCrudEndpoint}${propertie}`).pipe(
      catchError((error) => {
        let splitedPropertie = propertie.split(':');
        throw new CrudException(
          error.status,
          this.errorGeneric,
          this.errorActionGet,
          this.errorType,
          splitedPropertie[0],
          splitedPropertie[1],
        );
      }),
    );
  }

  /**
   * Create an entity of type T
   * @param {any} newEntry Data for create a new entity
   * @return {Observable<T>}
   * @throws {CrudException}
   * */
  public create(newEntry: any): Observable<T> {
    return this.httpClient.post<T>(this.apiCrudEndpoint, newEntry).pipe(
      catchError((error) => {
        throw new CrudException(
          error.status,
          this.errorGeneric,
          this.errorActionCreate,
          this.errorType,
        );
      }),
    );
  }

  /**
   * Delete an entity of type T
   * @param {number} id Id of the entity to delete
   * @return {Observable<T>}
   * @throws {CrudException}
   * */
  public delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiCrudEndpoint}${id}`).pipe(
      catchError((error) => {
        throw new CrudException(
          error.status,
          this.errorGeneric,
          this.errorActionDelete,
          this.errorType,
        );
      }),
    );
  }

  /**
   * Update an entity of type T
   * @param {number} id Id of the entity to update
   * @param {any} newEntry Data for update the entity
   * @return {Observable<T>}
   * @throws {CrudException}
   * */
  public update(id: number, updatedEntity: any): Observable<T> {
    return this.httpClient
      .put<T>(`${this.apiCrudEndpoint}id:${id}`, updatedEntity)
      .pipe(
        catchError((error) => {
          throw new CrudException(
            error.status,
            this.errorGeneric,
            this.errorActionUpdate,
            this.errorType,
          );
        }),
      );
  }

  /**
   * Sets the api endpoint url
   * @param {string} environmentApiUrl Api base url. Example: 'http://localhost:3000'
   * @param {string} crudEndopint Api endpoint url. Example: '/user'
   */
  public setApiCrudEndpointUrl(
    environmentApiUrl: string,
    crudEndopint: string,
  ): void {
    this.apiCrudEndpoint = `${environmentApiUrl}${this.apiUrl}${crudEndopint}`;
  }

  /**
   * Sets the error entity type translation string for compossed error messages
   * @param {string} errorType Error entity type translation string
   */
  public setErrorType(errorType: string): void {
    this.errorType = errorType;
  }
}
