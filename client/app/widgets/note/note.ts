export class Note {
	public _id: number;
	public date: Date;
	constructor(public body: string) {
		this.date = new Date();
	}
}