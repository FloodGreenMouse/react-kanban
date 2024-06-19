import Modal from '@/components/Modal/Modal.tsx'
import styled from 'styled-components'
import Button, { ButtonComponent } from '@/components/Button/Button.tsx'
import Label, { LabelComponent } from '@/components/Label/Label.tsx'
import { useContext } from 'react'
import { TasksContext } from '@/utils/contexts/tasks-context.tsx'

interface Task {
  id?: string,
  name?: string
  description?: string,
  status?: string,
  priority?: string
}

interface Modal {
  show: boolean,
  onClose: () => void,
  task: Task
}

export default function ModalCurrentTask ({show = false, task = {}, onClose}: Modal) {
  const { updateTasks, deleteTask } = useContext(TasksContext)

  const onTaskDelete = () => {
    onClose()
    deleteTask(task.id)
    updateTasks()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={`TASK-${task?.id?.slice(-3)}`}
      renderActions={
        <Actions>
          <Button onClick={onTaskDelete} color="error">Delete</Button>
          <Button onClick={onClose}>Close</Button>
        </Actions>
      }
    >
      <TaskTitle>
        <span>{task.name} </span>
      </TaskTitle>
      <TaskDescription>
        <Label>Description:</Label>
        <span>{task.description}</span>
      </TaskDescription>
    </Modal>
  )
}

const TaskTitle = styled.div`
  margin-bottom: 16px;

  span {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 8px;
  }
`

const TaskDescription = styled.div`
  ${LabelComponent} {
    font-weight: 600;
  }

  span {
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  
  ${ButtonComponent} + ${ButtonComponent} {
    margin-left: 8px;
  }
`