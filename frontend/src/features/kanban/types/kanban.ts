export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface BoardTask {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  dueDate?: string
  comments?: number
  attachments?: number
  subtasks?: { complete: number; total: number }
}