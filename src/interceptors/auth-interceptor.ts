import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { StorageService } from "src/app/service/storage.service";
import { API_CONFIG } from "src/config/api.config";

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    
    let localUser = inject(StorageService).getLocalUser();

    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

    if (localUser && requestToAPI) {
        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
        return next(authReq);
    }
    else {
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
        
                    console.error("Erro detectado pelo interceptor:");
                    console.error(errorObj);
    
                    return of(errorObj);
                })
            );
    }
}
