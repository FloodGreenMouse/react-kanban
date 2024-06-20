import { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Button {
  children?: ReactNode,
  width?: number,
  href?: string,
  to?: string | object,
  disabled?: boolean,
  secondary?: boolean,
  color?: 'primary' | 'secondary' | 'error'
  onClick?: MouseEventHandler
}

export default function Button ({children, width, href, to, disabled = false, color = 'primary', onClick}: Button) {
  return (
    <ButtonComponent $width={width} $color={color}>
      {!href && to && <Link onClick={onClick} to={to}>{children}</Link>}
      {href && !to && <a onClick={onClick} href={to}>{children}</a>}
      {!href && !to && <button onClick={onClick} disabled={disabled}>{children}</button>}
    </ButtonComponent>
  )
}

export const ButtonComponent = styled.div<{
  $width?: number,
  $color: 'primary' | 'secondary' | 'error' }
>`
  max-width: ${props => props.$width ? props.$width + 'px' : '100%'};

  button, a {
    display: inline-block;
    background-color: ${props => {
      switch (props.$color) {
        case 'primary':
          return '#4094F7'
        case 'secondary':
          return '#858585'
        case 'error':
          return '#F1635A'
        default:
          return '#4094F7'
      }
    }};
    width: 100%;
    padding: 4px 12px;
    font-size: 14px;
    line-height: 24px;
    color: #FFFFFF;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.2s ease;
  }
  
  button:disabled {
    background-color: #4094f78f;
  }
`