import styled from 'styled-components'
import { ReactNode, Children } from 'react'

type TaskListType = {
  children?: ReactNode
  title?: string,
  value?: string
}

export default function TaskList ({ title, children }: TaskListType) {
  return (
    <TaskListComponent className="task-list-component">
      <TaskTitle>
        <span>{title}</span>
      </TaskTitle>
      {!!Children.count(children) && <TaskListing>{children}</TaskListing>}
      {!Children.count(children) && <NothingFound>Empty</NothingFound>}
    </TaskListComponent>
  )
}

export const TaskListComponent = styled.div`
  min-width: 300px;
  max-width: 300px;
  padding: 12px 8px;
  border-radius: 6px;
  background-color: #F6F8F9;
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