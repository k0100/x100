import { BoardItemColumnType } from "./board-item-column-type";
import { BoardItemRowMarkerType } from "./boart-item-row-marker-type";

export class BoardItemType {
    public static Column: BoardItemColumnType = new BoardItemColumnType();
	public static RowMarker: BoardItemRowMarkerType = new BoardItemRowMarkerType();
    constructor() 
        {
    }
}