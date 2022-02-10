import { colors, ColorTypeKey } from 'src/assets/theme';
import { FontBody, FontStyleBody } from 'src/assets/topography';
import styled from 'styled-components';

export const sizeMap = {
  small: 28,
  medium: 36,
  large: 42
};

export type Size = keyof typeof sizeMap;

export const Button = styled.button<{
  colorType: ColorTypeKey;
  fullWidth: boolean;
  size: Size;
  font?: FontStyleBody;
  height?: string;
}>`
  appearance: none;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: ${({ font }): FontStyleBody => font || FontBody.STANDARD};
  border: none;
  color: ${({ colorType }): string => `${colors[colorType].contrastText}`};
  width: ${({ fullWidth }): string => (fullWidth ? '100%' : 'fit-content')};
  border-radius: ${({ size }): string => `${sizeMap[size] / 5}px`};
  padding: ${({ size }): string => (size === 'small' ? '0 10px' : '0 16px')};
  height: ${({ height, size }): string | number => height || `${sizeMap[size]}px`};
  background-color: ${({ colorType }): string => `${colors[colorType].main}`};
  :hover {
    background-color: ${({ colorType }): string => `${colors[colorType].hover}`};
    color: ${({ colorType }): string => `${colors[colorType].main}`};
  }
  :active {
    background-color: ${({ colorType }): string => `${colors[colorType].active}`};
  }
  :focus {
    background-color: ${({ colorType }): string => `${colors[colorType].focus}`};
    outline-color: ${({ colorType }): string => `${colors[colorType].focus}`};
    color: ${({ colorType }): string => `${colors[colorType].main}`};
  }
`;