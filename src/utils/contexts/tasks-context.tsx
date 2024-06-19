import { createContext, ReactNode, useState } from 'react'
import { TASK_STORAGE_NAME } from '@/utils/constants.ts'

interface Provider {
  children: ReactNode
}

interface Task {
  id: string,
  name: string
  description: string,
  status: string,
  priority: string
}

interface TasksContext {
  tasks: Task[],
  deleteTask: (id?: string) => void
  updateTasks: () => void
}

export const TasksContext = createContext<TasksContext>({
  tasks: [],
  deleteTask: (id?: string) => id,
  updateTasks: () => {}
})

export default function TasksContextProvider ({children}: Provider) {
  const [tasks, setTasks] = useState<Task[]>([])

  const updateTasks = () => {
    const storageTasks = JSON.parse(localStorage.getItem(TASK_STORAGE_NAME) || '[]')
    setTasks(storageTasks)
  }

  const deleteTask = (id?: string) => {
    let storageTasks = JSON.parse(localStorage.getItem(TASK_STORAGE_NAME) || '[]')
    storageTasks = storageTasks.filter((task: Task) => task.id !== id)
    localStorage.setItem(TASK_STORAGE_NAME, JSON.stringify(storageTasks))
    setTasks(storageTasks)
  }

  const value:TasksContext = {
    tasks,
    updateTasks,
    deleteTask
  }

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  )
}