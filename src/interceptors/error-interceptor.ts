import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { StorageService } from "src/app/service/storage.service";

export function errorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    let storage = inject(StorageService);
    let router = inject(Router);

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

                switch (errorObj.status) {
                    case 401:
                        handle401(storage, router);
                        break;

                    case 403:
                        handle403(storage, router);
                        break;
                }

                return of(errorObj);
            })
        )
}

function handle401(storage: StorageService, router: Router) {
    console.log('redirecionou pelo interceptor')

    storage.setLocalUser(null);
    router.navigate(['home']);
}

function handle403(storage: StorageService, router: Router) {
    console.log('redirecionou pelo interceptor')

    storage.setLocalUser(null);
    router.navigate(['home']);
}
