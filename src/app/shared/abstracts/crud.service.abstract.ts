import { Observable } from 'rxjs';

export abstract class CrudServiceAbstract<T> {
  abstract findAll(): Observable<T[]>;
  abstract findByPropertie(propertie: string): Observable<T>;
  abstract create(newEntry: any): Observable<T>;
  abstract delete(id: number): Observable<T>;
  abstract update(id: number, updatedEntity: any): Observable<T>;
}
