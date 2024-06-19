import { ReactNode } from 'react'
import CreateTaskModalContextProvider from '@/utils/contexts/create-task-modal-context.tsx'
import TasksContextProvider from '@/utils/contexts/tasks-context.tsx'

interface ContextProvider {
  children: ReactNode
}

export default function ContextProvider ({children}: ContextProvider) {
  return (
    <TasksContextProvider>
      <CreateTaskModalContextProvider>
        {children}
      </CreateTaskModalContextProvider>
    </TasksContextProvider>
  )
}