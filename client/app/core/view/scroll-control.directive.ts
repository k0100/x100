import { HostListener, Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
@Directive({ selector: '[scroll-control]' })

export class ScrollControltDirective implements AfterViewInit {

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.scroll(100);
    }
}
