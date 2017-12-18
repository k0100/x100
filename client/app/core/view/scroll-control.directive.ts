import { HostListener, Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
@Directive({ selector: '[scroll-control]' })


export class ScrollControltDirective implements AfterViewInit {

    private offset: number = 0;

    scrollElement(offset: number): void {
        this.el.nativeElement.scrollTop = offset;
    }

    @Input() set scrollOffset(value: number) {
        this.offset = value;
        this.scrollElement(this.offset);
    }

    get scrollOffset(): number {
        return this.offset;
    }

    constructor(private el: ElementRef) {
    }


    ngAfterViewInit(): void {
        this.scrollElement(this.offset);
    }
}