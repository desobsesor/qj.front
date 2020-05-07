import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {AuthenticationService} from '@/_services';
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('pasando por el interceptor ...');
        let cloneReq;
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            if (environment.enTest) {
                console.log('currentUser: ', currentUser);
            }
            const cloneReq = request.clone({
                setHeaders: {
                    Authorization: `Beares ${sessionStorage.getItem('Token')}`,
                    // Authorization: `Bearer ${currentUser.token}`
                    'Content-Type': 'application/json',
                    // 'Ocp-Apim-Subscription-Key': environment.SubscriptionKey
                }
            });
        }

        /*return next.handle(request);*/
        //return next.handle(request).pipe(
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    let inValid = this.errorResponse(event.body);
                    if (inValid) {
                        return null;
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.erroresHttpPeticion(error.status);
                return throwError(error);
            })
        );
    }

    erroresHttpPeticion(status: number): any {
        if (!status) {
            return false;
        }

        let mensaje = '';
        switch (status) {
            case 400:
                mensaje = 'Datos enviados insuficientes.';
                break;
            case 401:
                mensaje = 'Acceso no autorizado.';
                break;
            case 415:
                mensaje = 'Tipo de solicitud erronea.';
                break;
            case 500:
                mensaje = 'Error al ejecutar el proceso.';
                break;
            default:
                mensaje = 'Se presento un problema con la aplicación, por favor comuniquese con un administrador.';
                break;
        }
        if (environment.enTest) {
            console.log(mensaje);
        }
    }

    errorResponse(data: any): boolean {
        if (data) {
            if (typeof data['Value'] != 'undefined' && data['Value'] != 1) {
                try {
                    if (typeof data['Value'][0].ID_ERROR != 'undefined') {
                        if (environment.enTest) {
                            console.log(data['Value'][0].DESCRIPCION);
                        }
                        return true;
                    }
                } catch (error) {
                }

                try {
                    if (data['Value'] == -1) {
                        if (environment.enTest) {
                            console.log(data['Mensaje']);
                        }
                        return true;
                    }
                } catch (error) {
                }

                try {
                    if (data['Value'][0].Mensaje == 'La consulta no obtuvo registros.') {
                        if (environment.enTest) {
                            console.log(data['Value'][0].Mensaje);
                        }
                        return true;
                    }
                } catch (error) {
                }
            }
        }

        return false;
    }
}
