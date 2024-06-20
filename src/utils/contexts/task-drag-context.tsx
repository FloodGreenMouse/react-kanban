import { ReactNode, useState, createContext, useContext } from 'react'
import { TaskInterface, TaskListItemInterface } from '@/utils/interfaces'
import { TASK_STORAGE_NAME } from '@/utils/constants.ts'
import { TasksContext } from '@/utils/contexts/tasks-context.tsx'

interface Provider {
  children: ReactNode
}

interface TaskDragContext {
  currentTaskList: TaskListItemInterface | null,
  currentTask: TaskInterface | null,
  updateCurrentTask: (task: TaskInterface | null) => void,
  updateCurrentTaskList: (taskListItem: TaskListItemInterface | null) => void
  updateTaskList: () => void
}

export const TaskDragContext = createContext<TaskDragContext>({
  currentTaskList: null,
  currentTask: null,
  updateCurrentTask: (task: TaskInterface | null) => task,
  updateCurrentTaskList: (taskListItem: TaskListItemInterface | null) => taskListItem,
  updateTaskList: () => {}
})

export default function TaskDragContextProvider ({ children }: Provider) {
  const [
    currentTaskList,
    setCurrentTaskList
  ] = useState<TaskListItemInterface | null>(null)

  const [
    currentTask,
    setCurrentTask
  ] = useState<TaskInterface | null>(null)

  const { updateTasks } = useContext(TasksContext)

  const updateCurrentTask = (task: TaskInterface | null = null) => {
    setCurrentTask(task)
  }

  const updateCurrentTaskList = (taskListItem: TaskListItemInterface | null = null) => {
    setCurrentTaskList(taskListItem)
  }

  const updateTaskList = () => {
    let storageTasks = JSON.parse(localStorage.getItem(TASK_STORAGE_NAME) || '[]')
    let currentStorageTask = storageTasks.find((task: TaskInterface) => task.id === currentTask?.id)

    if (!currentTask || !currentStorageTask || !currentTaskList) return
    if (currentTaskList && currentStorageTask.status === currentTaskList.value) return

    currentStorageTask = {
      ...currentStorageTask,
      status: currentTaskList?.value
    }

    storageTasks = storageTasks.filter((task: TaskInterface) => task.id !== currentTask?.id)
    storageTasks.push(currentStorageTask)

    localStorage.setItem(TASK_STORAGE_NAME, JSON.stringify(storageTasks))
    updateTasks()
  }

  const value = {
    currentTaskList,
    currentTask,
    updateCurrentTask,
    updateCurrentTaskList,
    updateTaskList
  }

  return (
    <TaskDragContext.Provider value={value}>
      {children}
    </TaskDragContext.Provider>
  )
}