import styled from 'styled-components'
import { ChangeEventHandler, ReactNode } from 'react'

interface Select {
  children?: ReactNode,
  name?: string,
  onChange?: ChangeEventHandler
}

export default function Select ({children, name = '', onChange}: Select) {
  return (
    <SelectComponent
      onChange={onChange}
      name={name}
    >{children}</SelectComponent>
  )
}

const SelectComponent = styled.select`
  width: 100%;
  border: 1px solid #DDE2E4;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 10px;
  font-weight: 300;
  resize: none;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:hover, &:focus {
    border-color: #4094F7;
  }
`