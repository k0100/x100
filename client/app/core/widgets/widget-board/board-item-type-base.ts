import { BoardItemColumnType } from "./board-item-column-type";
import { BoardItemRowMarkerType } from "./boart-item-row-marker-type";

export abstract class BoardItemTypeBase {
    constructor(public id: number) {
    }
}