import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

//interceptors intercept a request and does this code before its completation.
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way'); //basically prints whenever there is a request.
    const modReq = req.clone({ headers: req.headers.append('Auth', 'content') }); //clone from the original then add Auth: content
    return next.handle(modReq).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response) { 
          console.log('Response arrived. Body data: ');
          console.log(event.body); 
        }

      })); //return the modified request
  }
}
