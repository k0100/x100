import { RequestOptionsArgs } from "@angular/http/src/interfaces";

export class ServerCommand implements RequestOptionsArgs {
	constructor(public commandName: string, public data: any) {
	}

	public body?(): any {
		return this;
	};
}