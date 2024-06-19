import { ChangeEventHandler } from 'react'
import styled from 'styled-components'

interface Textarea {
  id?: string,
  name?: string,
  value?: string,
  rows?: number,
  onChange: ChangeEventHandler<HTMLTextAreaElement>
}

export default function Textarea ({ id = '', name = '', value = '', rows = 6, onChange }: Textarea) {
  return (
    <TextareaComponent>
      <textarea
        name={name}
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
    </TextareaComponent>
  )
}

const TextareaComponent = styled.div`
  textarea {
    width: 100%;
    border: 1px solid #DDE2E4;
    border-radius: 6px;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 10px;
    font-weight: 300;
    resize: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #4094F7;
    }
  }
`
