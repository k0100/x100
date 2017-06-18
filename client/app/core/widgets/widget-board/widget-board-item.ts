import { BoardItemTypeBase } from "./board-item-type-base";

export class WidgetBoardItem {
    public itemClass: string;


    constructor(
        public index: number,
        public usedColumns: number,
        public itemType: BoardItemTypeBase
    ) {
        this.itemClass = "clearfix ignore-item"
    }

    public canExpand(): boolean {
        return this.usedColumns < 4;
    }

    public canShrink(): boolean {
        return this.usedColumns > 1;
    }

    public canHostWidgets():boolean{
        return true;
    }
}