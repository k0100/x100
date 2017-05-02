import { Injectable } from "@angular/core";
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable()
export class HttpService1 extends Http {
    constructor(private router: Router, backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, options).catch(this.catchAuthError(this));
    }

    post(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError(self: HttpService1) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                this.router.navigate(['/signin']);
            }
            return Observable.throw(res);
        };
        // processUnauthorize(response: Response): void {
        //     alert(response.status);
        // if (response.status == 401) {
        //         this.router.navigate(['/signin']);
        //     }
        // }
    }
}