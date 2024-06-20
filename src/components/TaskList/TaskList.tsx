import { ReactNode, DragEvent, Children, useContext, useState } from 'react'
import styled from 'styled-components'
import { TaskListItemInterface } from '@/utils/interfaces'
import { TaskDragContext } from '@/utils/contexts/task-drag-context.tsx'

interface TaskListType {
  children?: ReactNode
  taskListItem: TaskListItemInterface
}

export default function TaskList ({ taskListItem, children }: TaskListType) {
  const { updateCurrentTaskList } = useContext(TaskDragContext)
  const [isCurrentDropEl, setIsCurrentDropEl] = useState(false)

  const onDragOver = (e: DragEvent<HTMLDivElement>, taskListItem: TaskListItemInterface) => {
    e.preventDefault()
    updateCurrentTaskList(taskListItem)
    setIsCurrentDropEl(true)
  }

  const onDragLeave = () => {
    updateCurrentTaskList(null)
    setIsCurrentDropEl(false)
  }

  const onDrop = () => {
    setIsCurrentDropEl(false)
  }

  return (
    <TaskListComponent
      $currentDrop={isCurrentDropEl}
      className="task-list-component"
      onDragOver={(e: DragEvent<HTMLDivElement>) => onDragOver(e, taskListItem)}
      onDrop={onDrop}
      onDragLeave={() => onDragLeave()}
    >

      <TaskTitle>
        <span>{taskListItem.name}</span>
      </TaskTitle>

      {!!Children.count(children) && <TaskListing>{children}</TaskListing>}
      {!Children.count(children) && <NothingFound>Empty</NothingFound>}
    </TaskListComponent>
  )
}

export const TaskListComponent = styled.div<{$currentDrop: boolean}>`
  min-width: 300px;
  max-width: 300px;
  padding: 12px 8px;
  border-radius: 6px;
  background-color: ${props => props.$currentDrop ? '#DDF6EB' : '#F6F8F9'};
  transition: background-color 0.2s ease;

  &.drag-ready {
    background-color: red;
  }
`

const TaskTitle = styled.div`
  margin-bottom: 8px;

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
    color: #6E7C87;
    cursor: default;
  }
`

const TaskListing = styled.div`
  display: flex;
  flex-direction: column;
`

const NothingFound = styled.span`
  display: block;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: #6E7C87;
  text-align: center;
  margin: 20px;
`