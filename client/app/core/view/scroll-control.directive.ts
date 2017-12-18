import { HostListener, Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
@Directive({ selector: '[scroll-control]' })


export class ScrollControltDirective implements AfterViewInit {

    private offset: number;

    @Input() set scrollOffset(value: number) {
        this.offset = value;
        scroll(this.offset);
    }

    get scrollOffset(): number {
        return this.offset;
    }

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        scroll(this.offset);
    }

    scroll(offset: number): void {
        this.el.nativeElement.scrollTop = offset;
    }
}