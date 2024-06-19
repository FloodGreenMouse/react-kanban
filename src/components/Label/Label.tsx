import styled from 'styled-components'
import { ReactNode } from 'react'

interface LabelInterface {
  children?: ReactNode,
  required?: boolean,
  className?: string
}

export default function Label ({children, required = false, className = ''}: LabelInterface) {
  return (
    <LabelComponent className={className} required={required}>{children}</LabelComponent>
  )
}

export const LabelComponent = styled.span<{required: boolean}>`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 22px;

  ${props => props.required && `
    &:after {
      content: "*";
    }
  `}
`