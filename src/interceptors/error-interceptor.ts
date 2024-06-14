/*
    private Long timestamp;
    private Integer status;
    private String error;
    private String message;
    private String path;
*/

import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";

export function errorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log("Passou no interceptor");

    return next(req)
        .pipe(
            catchError((error) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
    
                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                return of(errorObj);
            })
        )
}
