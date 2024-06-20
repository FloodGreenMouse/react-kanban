import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { TASK_STATUSES } from '@/utils/constants.ts'
import { TasksContext } from '@/utils/contexts/tasks-context.tsx'
import TaskList, { TaskListComponent } from '../components/TaskList/TaskList.tsx'
import Task from '../components/Task/Task.tsx'
import ModalCurrentTask from '@/components/ModalCurrentTask/ModalCurrentTask.tsx'

interface Task {
  id: string,
  name: string
  description: string,
  status: string,
  priority: string
}

export default function PageKanban () {
  const [currentTask, setCurrentTask] = useState({})
  const [showCurrentTaskModal, setShowCurrentTaskModal] = useState(false)
  const { tasks, updateTasks } = useContext(TasksContext)

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task: Task) => task.status === status)
  }

  const currentTaskClickHandler = (task: Task) => {
    setCurrentTask(task)
    setShowCurrentTaskModal(true)
  }

  const closeCurrentTaskModal = () => {
    setShowCurrentTaskModal(false)
  }

  useEffect(() => {
    updateTasks()
  }, [])

  const getTaskLists = TASK_STATUSES.map(taskListItem =>
    <TaskList taskListItem={taskListItem} key={taskListItem.value}>
      {getTasksByStatus(taskListItem.value).map((task, i) =>
        <Task onClick={currentTaskClickHandler} task={task} key={i}/>)}
    </TaskList>)

  return (
    <>
      <TaskListSection>
        {getTaskLists}
      </TaskListSection>
      <ModalCurrentTask show={showCurrentTaskModal} onClose={closeCurrentTaskModal} task={currentTask}/>
      <Outlet/>
    </>
  )
}

const TaskListSection = styled.section`
  display: flex;
  padding: 8px;

  ${TaskListComponent} + ${TaskListComponent} {
    margin-left: 10px;
  }
`

