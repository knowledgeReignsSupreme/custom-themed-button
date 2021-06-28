import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<ButtonProps> {
  text?: string;
  icon?: any;
  iconPosition?: 'right' | 'left';
  disabled?: boolean;
  handleClick?: (arg: any) => any;
}

export interface StyledProps {
  color: string;
  bgColor: string;
  size?: OptionalSizes;
  iconSize?: string;
  shape?: 'pill' | 'circle';
  showBorder?: boolean;
  borderColor?: string;
  borderWidth?: string;
  showShadow?: boolean;
  fontWeight?: string;
  hoverColor?: string;
  hoverEffect?:
    | 'expand'
    | 'lowerOpacity'
    | '2dClick'
    | 'slideFromLeft'
    | 'slideFromRight';
  slideBgColor?: string;
}

export interface calculatedStyleProps {
  padding?: string;
  hoverExpantion?: string;
}

export type OptionalSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IProps = ButtonProps & StyledProps & calculatedStyleProps;

const xsButton = {
  ver: '0.2rem',
  hor: '0.4rem',
};

const smButton = {
  ver: '0.3rem',
  hor: '0.6rem',
};

const mdButton = {
  ver: '0.6rem',
  hor: '1.2rem',
};

const lgButton = {
  ver: '0.8rem',
  hor: '1.6rem',
};

const xlButton = {
  ver: '1rem',
  hor: '2rem',
};

const determineSize = (size: OptionalSizes): string => {
  switch (size) {
    case 'xs':
      return `${xsButton.ver} ${xsButton.hor}`;
    case 'sm':
      return `${smButton.ver} ${smButton.hor}`;
    case 'md':
      return `${mdButton.ver} ${mdButton.hor}`;
    case 'lg':
      return `${lgButton.ver} ${lgButton.hor}`;
    case 'xl':
      return `${xlButton.ver} ${xlButton.hor}`;
    default:
      return `${mdButton.ver} ${mdButton.hor}`;
  }
};

const determineHoverExapntion = (size: OptionalSizes): string => {
  switch (size) {
    case 'xs':
      return `${xsButton.ver} ${smButton.hor}`;
    case 'sm':
      return `${smButton.ver} ${mdButton.hor}`;
    case 'md':
      return `${mdButton.ver} ${lgButton.hor}`;
    case 'lg':
      return `${lgButton.ver} ${xlButton.hor}`;
    case 'xl':
      return `${xlButton.ver} 2.4rem`;
    default:
      return `${mdButton.ver} ${mdButton.hor}`;
  }
};

export const Button: React.FC<IProps> = ({
  text,
  color,
  bgColor,
  size = 'md',
  shape,
  icon,
  iconSize = 'initial',
  iconPosition = 'left',
  showShadow = true,
  showBorder = true,
  borderWidth,
  borderColor,
  fontWeight = 'initial',
  hoverEffect = 'expand',
  hoverColor,
  slideBgColor,
  disabled,
  handleClick,
}) => {
  return (
    <StyledButton
      color={color}
      bgColor={bgColor}
      padding={determineSize(size || 'md')}
      shape={shape}
      iconSize={iconSize}
      iconPosition={iconPosition}
      showShadow={showShadow}
      showBorder={showBorder}
      borderColor={borderColor}
      borderWidth={borderWidth}
      fontWeight={fontWeight}
      hoverEffect={hoverEffect}
      hoverColor={hoverColor}
      hoverExpantion={determineHoverExapntion(size || 'md')}
      slideBgColor={slideBgColor}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon && iconPosition === 'left' && icon} {text && text}{' '}
      {icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};

const StyledButton = styled.button<IProps>`
  z-index: 1;
  position: relative;
  font-weight: ${props => props.fontWeight || 'initial'};
  cursor: pointer;
  transition: all 0.4s;

  color: ${props => props.theme[props.color]};
  padding: ${props => props.padding};
  box-shadow: ${props => props.showShadow && '0 7px 5px rgba(0, 0, 0, 0.2)'};

  background: ${props =>
    props.bgColor === 'transparent'
      ? 'transparent'
      : props.theme[props.bgColor]};

  border: ${props =>
    props.showBorder
      ? `${props.borderWidth || '1px'} solid ${props.theme[
          props.borderColor!
        ] || props.theme[props.bgColor]}`
      : 'initial'};

  border-radius: ${props =>
    props.shape === 'pill' ? '20px / 50%' : props.shape === 'circle' && ' 50%'};

  &:hover {
    color: ${props => props.theme[props.hoverColor || props.color]};

    color: ${props =>
      props.hoverEffect === 'slideFromLeft' &&
      props.theme[props.hoverColor || props.bgColor]};

    color: ${props =>
      props.hoverEffect === 'slideFromRight' &&
      props.theme[props.hoverColor || props.bgColor]};

    opacity: ${props => props.hoverEffect === 'lowerOpacity' && '0.6'};

    padding: ${props => props.hoverEffect === 'expand' && props.hoverExpantion};

    transform: ${props =>
      props.hoverEffect === '2dClick' && 'translateY(-5px)'};

    box-shadow: ${props =>
      props.hoverEffect === '2dClick' && '0 12px 5px rgba(0, 0, 0, 0.3)'};
  }

  &:focus {
    transform: ${props => props.hoverEffect === '2dClick' && 'translateY(0)'};

    box-shadow: ${props =>
      props.hoverEffect === '2dClick' && '0 7px 5px rgba(0, 0, 0, 0.2)'};
  }

  &:after {
    position: absolute;
    content: '';
    width: 0;
    top: 0;
    right: ${props => props.hoverEffect === 'slideFromRight' && 0};
    left: ${props => props.hoverEffect === 'slideFromLeft' && 0};

    z-index: -1;

    height: ${props =>
      props.hoverEffect === 'slideFromLeft' ||
      props.hoverEffect === 'slideFromRight'
        ? '100%'
        : 0};

    background: ${props => props.theme[props.slideBgColor || props.color]};

    transition: all 0.3s ease;

    border-radius: ${props =>
      props.shape === 'pill'
        ? '20px / 50%'
        : props.shape === 'circle' && ' 50%'};
  }

  &:hover:after {
    width: 100%;

    right: ${props => props.hoverEffect === 'slideFromRight' && 0};
    left: ${props => props.hoverEffect === 'slideFromLeft' && 0};
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    vertical-align: middle;

    font-size: ${props => props.iconSize};
  }
`;
