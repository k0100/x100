export class Todo {
	public _id: string;
	constructor(public widgetId: string, public description: string, public isCompleted: boolean) {
	}
}