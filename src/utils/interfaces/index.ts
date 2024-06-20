export interface TaskInterface {
  id: string,
  name: string
  description: string,
  status: string,
  priority: string
}

export interface TaskListItemInterface {
  name?: string,
  value?: string
}