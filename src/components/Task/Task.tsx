import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import IconPriorityHigh from './IconPriorityHigh.tsx'
import IconPriorityLow from './IconPriorityLow.tsx'

interface Task {
  id: string,
  name: string
  description: string,
  status: string,
  priority: string
}

interface Modal {
  task: Task,
  onClick: (task: Task) => void
}

export default function Task ({ task = { id: '', status: '', description: '', name: '', priority: '' }, onClick }: Modal) {
  const taskRef = useRef<HTMLDivElement | null>(null)

  const dragFunc = (e: Event) => {
    console.log(e)
  }

  useEffect(() => {
    if (taskRef?.current) {
      taskRef.current.addEventListener('dragstart', dragFunc, true)
      taskRef.current.addEventListener('dragenter', dragFunc, true)
    }

    return () => {
      if (taskRef?.current) {
        taskRef.current.removeEventListener('dragstart', dragFunc, true)
        taskRef.current.removeEventListener('dragenter', dragFunc, true)
      }
    }
  })

  const getTaskPriority = () => {
    switch (task.priority) {
      case 'LOW':
        return <IconPriorityLow/>
      case 'HIGH':
        return <IconPriorityHigh/>
      default:
        return <></>
    }
  }

  const onClickHandler = () => {
    onClick(task)
  }

  return (
    <TaskComponent draggable="true" ref={taskRef} onClick={onClickHandler}>
      <TaskId>
        <a>TASK-{task.id.slice(-3)}</a>
      </TaskId>

      <TaskTitle>
        <span>{task.name}</span>
      </TaskTitle>

      <TaskFooter>
        <TaskStatus>
          {getTaskPriority()}
        </TaskStatus>
        <UserAvatar>
          <span>PG</span>
        </UserAvatar>
      </TaskFooter>
    </TaskComponent>
  )
}

export const TaskComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: #FFFFFF;
  box-shadow: 0 0 1px rgba(26, 32, 36, 0.32), 0 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 6px;
  cursor: move;
  
  & + & {
    margin-top: 8px;
  }
`

const TaskId = styled.div`
  margin-bottom: 4px;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: #252C32;

    &:hover {
      text-decoration: underline;
    }
  }
`

const TaskTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #252C32;
  margin-bottom: 12px;
`

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #D7EDFF;
  border-radius: 12px;

  span {
    font-weight: 600;
    font-size: 10px;
    color: #0452C8;
    cursor: default;
  }
`

const TaskStatus = styled.div`
  width: 24px;
  height: 24px;
`