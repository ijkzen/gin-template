import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from './bean/response/response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getMenuList(): Observable<string[]> {
    return this.handleRequest(this.http.get<Response<string[]>>("/api/admin/menu/list"));
  }

  private handleRequest<T>(ob: Observable<Response<T>>): Observable<T> {
    return ob.pipe(
      map(response => {
        if (response.isSuccess()) {
          return response.data;
        }
        throw new Error(response.errMessage);
      })
    );
  }
}
