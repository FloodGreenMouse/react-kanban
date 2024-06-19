import styled from 'styled-components'
import Button from '../Button/Button.tsx'
import { useContext } from 'react'
import { CreateTaskModalContext } from '@/utils/contexts/create-task-modal-context.tsx'

export default function Header () {
  const {openModal} = useContext(CreateTaskModalContext)
  //
  const openCreateTaskModal = () => {
    openModal()
  }

  return (
    <>
      <HeaderComponent>
        <Title>Kanban</Title>
        <Button onClick={openCreateTaskModal} width={200}>Create task</Button>
      </HeaderComponent>
    </>
  )
}

const HeaderComponent = styled.header`
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E9EB;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 700;
`