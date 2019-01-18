import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/switchMap';

import { AuthService } from "../auth/auth.service";
import * as fromApp from '../app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Intercepted!",req);
        return this.store.select("auth")
            .switchMap((authState: fromAuth.State)=>{
                const copiedReq = req.clone({params: req.params.set('auth',authState.token)})
                return next.handle(copiedReq);
            })
    }
}