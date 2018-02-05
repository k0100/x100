import { Directive, TemplateRef, ViewContainerRef, Input, ElementRef, OnInit } from "@angular/core";
import { RegExp } from "core-js/library/web/timers";

@Directive({ selector: '[html-text]' })

export class HtmlTextDirective implements OnInit {
    @Input() text: string;

    private urlExpression: RegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

    constructor(private el: ElementRef) {

    }

    ngOnInit(): void {
        (this.el.nativeElement as HTMLElement).innerHTML = this.processLinks(this.text);
    }

    private processLinks(text: string): string {
        return text.replace(this.urlExpression, '<a href="$1" target="_blank">$1</a>');
    }
}