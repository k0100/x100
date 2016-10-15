export class Note {
	public _id: number;
	public date: Date;
	constructor(public body: string) {
		this.date = new Date();

		// this.heading = body.substr(0, maxHeadingLength);
		// let bodyLen = body.length;
		// this.subHeading = bodyLen < maxHeadingLength ?
		// 	"" : body.substr(maxHeadingLength, maxSubHeadingLength);
		// this.subHeading += bodyLen < maxHeadingLength + maxSubHeadingLength ? "" : "...";
	}

}