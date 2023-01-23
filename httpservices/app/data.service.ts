import { BadRequestError } from './common/bad-request-error';
import { NotFoundError } from './common/not-found-error';
import { AppError } from './common/app-error';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


export class DataService {
  
  constructor(private url:string, private http: HttpClient){
    
  }
  

  getAll(){
    return this.http.get(this.url)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  create(resource:{}){
    interface res{
      id:number;
    }
    return this.http.post<res>(this.url+'/add',resource)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  update(id:number,resource:{}){
    return this.http.patch(this.url+'/'+id, resource)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  delete(id:number){
    console.log(id)
    return this.http.delete(this.url+'/'+id)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  private handleError(error:Response){
    if(error.status === 400)
        return throwError(()=> new BadRequestError());

    if(error.status === 404)
        return throwError(()=> new NotFoundError());

    return throwError(() =>new AppError(error));
      
  }
}
