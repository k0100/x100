import { Phone } from "./phone";

export class Contact {
    public _id: string;
    public date: Date;
    constructor(
        public widgetId: string,
        public name: string,
        public note: string,
        public birthday: Date,
        public phones: Phone[]
    ) {
        this.date = new Date();
    }
}