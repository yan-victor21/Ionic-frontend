import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public storage: StorageService,public alertCrtl:AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 401:
                    this.handler401();
                break;  

                case 403:
                    this.handler403();
                break;
                
                default:
                    this.ErrorDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handler403(){
        this.storage.setLocalUser(null);
    }
    handler401(){
        let arlet =this.alertCrtl.create({
            title: 'Erro 401: Falha de Autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons:[{
                text: 'Ok'            
            }]
        });
        arlet.present();
    }
    ErrorDefaultError(errorObj){
        let arlet =this.alertCrtl.create({
            title: 'Erro '+ errorObj.status + ': '+ errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons:[{
                text: 'Ok'            
            }]
        });
        arlet.present(); 
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};