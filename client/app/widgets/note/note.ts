export class Note {
	public _id: number;
	public date: Date;
	constructor(public widgetId: string, public body: string) {
		this.date = new Date();
	}
}