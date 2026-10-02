import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BoardTask, TaskStatus } from '../types/kanban'
import { TaskCard } from './TaskCard'

const stageStyles: Record<TaskStatus, { dot: string; count: string }> = {
  Backlog: { dot: 'bg-slate-400', count: 'bg-slate-200 text-slate-600' },
  'To Do': { dot: 'bg-blue-500', count: 'bg-blue-100 text-blue-700' },
  'In Progress': { dot: 'bg-amber-500', count: 'bg-amber-100 text-amber-800' },
  'In Review': { dot: 'bg-violet-500', count: 'bg-violet-100 text-violet-700' },
  Done: { dot: 'bg-emerald-500', count: 'bg-emerald-100 text-emerald-700' },
}

interface KanbanColumnProps {
  status: TaskStatus
  tasks: BoardTask[]
  onDragStart: (event: React.DragEvent<HTMLElement>, taskId: string) => void
  onDrop: (event: React.DragEvent<HTMLElement>, status: TaskStatus) => void
}

export function KanbanColumn({ status, tasks, onDragStart, onDrop }: KanbanColumnProps) {
  const colors = stageStyles[status]
  return (
    <section aria-label={`${status} tasks`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, status)} className="flex h-full min-h-0 w-[min(22rem,calc(100vw-2rem))] shrink-0 flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:w-[22rem]">
      <header className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`size-2.5 shrink-0 rounded-full ${colors.dot}`} />
          <h2 className="truncate text-sm font-bold uppercase tracking-wide text-slate-700">{status}</h2>
          <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${colors.count}`}>{tasks.length}</span>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label={`More options for ${status}`} className="text-slate-400"><MoreVertical /></Button>
      </header>
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pb-1 pr-1">
        {tasks.length > 0 ? tasks.map((task) => <TaskCard key={task.id} task={task} onDragStart={onDragStart} />) : (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400">Drop a task here</div>
        )}
      </div>
    </section>
  )
}