import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Observable, catchError, of } from "rxjs";
import { StorageService } from "src/app/service/storage.service";

export function errorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const storage = inject(StorageService);
    const router = inject(Router);
    const alertCtrl = inject(AlertController);

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
                        handle401(storage, router, alertCtrl);
                        break;

                    case 403:
                        handle403(storage, router);
                        break;

                    default:
                        handleDefaultEror(errorObj, alertCtrl);
                }

                return of(errorObj);
            })
        )
}

function handle401(storage: StorageService, router: Router, alertCtrl: AlertController) {
    const alertProps: AlertProps = {
        header: 'Erro 401: falha de autenticação',
        message: 'Email ou senha incorretos',
        backdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    }
    presentAlert(alertCtrl, alertProps);
    storage.setLocalUser(null);
    router.navigate(['home']);
}

function handle403(storage: StorageService, router: Router) {
    storage.setLocalUser(null);
    router.navigate(['home']);
}

function handleDefaultEror(errorObj: any, alertCtrl: AlertController) {
    const alertProps: AlertProps = {
        header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        backdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    }
    presentAlert(alertCtrl, alertProps);
}

async function presentAlert(alertCtrl: AlertController, alertProps: AlertProps) {
    const alert = await alertCtrl.create({
        header: alertProps.header,
        message: alertProps.message,
        backdropDismiss: alertProps.backdropDismiss,
        buttons: [
            {
                text: alertProps.buttons[0].text
            }
        ]
    });
    await alert.present();
}

type AlertProps = {
    header: string;
    message: string;
    backdropDismiss: boolean;
    buttons: [
        {
            text: string
        }
    ]
}
