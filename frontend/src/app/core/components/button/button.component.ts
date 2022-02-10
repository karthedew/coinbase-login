import { Component, Input, OnInit } from '@angular/core';
import { ColorTypeKey } from 'src/assets/theme';
import { FontStyleBody } from 'src/assets/topography';
import { Size } from './button.style';

export interface Props {
  children: string | number | JSX.Element | JSX.Element[];
  buttonSize: Size;
  color: ColorTypeKey;
  isFullWidth: boolean;
  height?: string;
  font?: FontStyleBody;
  type?: 'button';
  style?: React.CSSProperties;
  disabled?: boolean;
  handleAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonConfig: any;
  constructor() { }

  ngOnInit(): void {
  }

}
