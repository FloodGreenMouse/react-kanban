import styled from 'styled-components'
import {  ChangeEventHandler } from 'react'

interface InputInterface {
  value?: string,
  name: string,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Input ({value, name, onChange}: InputInterface) {
  return (
    <InputComponent>
      <input name={name} value={value} type="text" onChange={onChange}/>
    </InputComponent>
  )
}

const InputComponent = styled.div`
  input {
    width: 100%;
    border: 1px solid #DDE2E4;
    border-radius: 6px;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 10px;
    font-weight: 300;
    transition: border-color 0.2s ease;
    
    &:focus {
      border-color: #4094F7;
    }
  }
`