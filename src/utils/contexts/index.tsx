import { ReactNode } from 'react'
import CreateTaskModalContextProvider from '@/utils/contexts/create-task-modal-context.tsx'
import TasksContextProvider from '@/utils/contexts/tasks-context.tsx'
import TaskDragContextProvider from '@/utils/contexts/task-drag-context.tsx'

interface ContextProvider {
  children: ReactNode
}

export default function ContextProvider ({ children }: ContextProvider) {
  return (
    <TasksContextProvider>
      <TaskDragContextProvider>
        <CreateTaskModalContextProvider>
          {children}
        </CreateTaskModalContextProvider>
      </TaskDragContextProvider>
    </TasksContextProvider>
  )
}