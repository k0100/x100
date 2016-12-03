import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Credentials } from './credentials';
import { Principal } from '../../core/secure/principal';
import { ServerCommand } from '../../core/server/command'

@Injectable()
export class SecureService {
	constructor(private http: Http) {
	}

	public signUp(email: string, password: string): Observable<Principal> {
		const command = new ServerCommand("signup", new Credentials(email, password));
		return this.http.post('/api/secure/', command)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public signIn(email: string, password: string): Observable<Principal> {
		const command = new ServerCommand("signin", new Credentials(email, password));
		return this.http.post('/api/secure/', command)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}