import { Directive, Input, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { colors, ColorTypeKey } from 'src/assets/theme';
import { FontBody, FontStyleBody } from 'src/assets/topography';
import { Size, sizeMap, button_style } from './alt-button.styles';

@Directive({
  selector: 'atlButtonDirective'
})
export class AtlButtonDirective implements OnInit {

  @Input() colorType: ColorTypeKey = 'primary';
  @Input() fullWidth: boolean = false;
  @Input() size: Size = 'large';
  @Input() font?: FontStyleBody;
  @Input() height?: string = '';

  onHoverStyle = {
    'background-color': `${colors[this.colorType].hover}`,
    'color': `${colors[this.colorType].main}`
  }

  activeStyle = {
    'background-color': `${colors[this.colorType].active}`
  }

  focusStyle = {
    'background-color': `${colors[this.colorType].focus}`,
    'outline-color': `${colors[this.colorType].focus}`,
    'color': `${colors[this.colorType].main}`
  }

  style = {
    'appearance': 'none',
    'cursor': 'pointer',
    'display': 'flex',
    'text-align': 'center',
    'align-items': 'center',
    'justify-content': 'center',
    'position': 'relative',
    // 'font-family': this.font || FontBody.STANDARD,
    'border': 'none',
    'color': colors[this.colorType].contrastText,
    'width': this.fullWidth ? '100%' : 'fit-content',
    'border-radius': `${sizeMap[this.size]/5}px`,
    'padding': (this.size === 'small' ? '0 10px' : '0 16px'),
    'height': this.height || `${sizeMap[this.size]}px`,
    'background-color': `${colors[this.colorType].main}`
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

    const requiredStyles = {
      'color': colors[this.colorType].main,
      'font-weight': 'bold',
      //...and so on
    };

    Object.keys(this.style).forEach(newStyle => { 
      this.renderer.setStyle(
         this.elementRef.nativeElement, `${newStyle}`, this.style[newStyle]
         );
    });


  }

  @HostListener('mouseenter') onMouseEnter() {
    // this.elementRef.nativeElement.classList.add(this.hoverClass);

    Object.keys(this.onHoverStyle).forEach(newStyle => { 
      this.renderer.setStyle(
         this.elementRef.nativeElement, `${newStyle}`, this.onHoverStyle[newStyle]
         );
    });
 }

  @HostListener('mouseleave') onMouseLeave() {
    Object.keys(this.style).forEach(newStyle => { 
      this.renderer.setStyle(
         this.elementRef.nativeElement, `${newStyle}`, this.style[newStyle]
         );
    });
  }

  @HostListener('document:click') onMouseClick() {
    Object.keys(this.activeStyle).forEach(newStyle => { 
      this.renderer.setStyle(
         this.elementRef.nativeElement, `${newStyle}`, this.activeStyle[newStyle]
         );
    });
  }

  @HostListener('document:click') onMouseFocus() {
    Object.keys(this.focusStyle).forEach(newStyle => { 
      this.renderer.setStyle(
         this.elementRef.nativeElement, `${newStyle}`, this.focusStyle[newStyle]
         );
    });
  }

}
