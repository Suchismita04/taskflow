import { CalendarDays, Clock3, MessageCircle, Paperclip } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { BoardTask } from '../types/kanban'

const priorityClasses = {
  Low: 'border-slate-200 bg-slate-100 text-slate-600',
  Medium: 'border-amber-200 bg-amber-50 text-amber-700',
  High: 'border-rose-200 bg-rose-50 text-rose-700',
}

const assigneeClasses: Record<string, string> = {
  JL: 'bg-indigo-100 text-indigo-700',
  SP: 'bg-emerald-100 text-emerald-700',
  AM: 'bg-amber-100 text-amber-800',
  WM: 'bg-slate-200 text-slate-700',
}

interface TaskCardProps {
  task: BoardTask
  onDragStart: (event: React.DragEvent<HTMLElement>, taskId: string) => void
  compact?: boolean
}

export function TaskCard({ task, onDragStart, compact = false }: TaskCardProps) {
  const isDueToday = task.dueDate === 'Today'

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task.id)}
      className="group cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:border-blue-300 hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-wide text-slate-400">{task.id}</span>
        <Badge variant="outline" className={`h-6 rounded-md px-2 text-xs ${priorityClasses[task.priority]}`}>
          {task.priority}
        </Badge>
      </div>
      <h3 className="mt-3 text-[0.94rem] font-semibold leading-snug text-slate-900">{task.title}</h3>
      {task.subtasks && !compact && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>Progress</span><span>{task.subtasks.complete}/{task.subtasks.total} subtasks</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-blue-600" style={{ width: `${(task.subtasks.complete / task.subtasks.total) * 100}%` }} />
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
        <div className="flex min-w-0 items-center gap-3">
          {task.dueDate && <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${isDueToday ? 'text-orange-600' : 'text-slate-500'}`}>
            {isDueToday ? <Clock3 className="size-3.5" /> : <CalendarDays className="size-3.5" />}
            {isDueToday ? 'Due Today' : task.dueDate}
          </span>}
          {task.comments ? <span className="inline-flex items-center gap-1"><MessageCircle className="size-3.5" />{task.comments}</span> : null}
          {task.attachments ? <span className="inline-flex items-center gap-1"><Paperclip className="size-3.5" />{task.attachments}</span> : null}
        </div>
        <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold ${assigneeClasses[task.assignee] ?? 'bg-slate-100 text-slate-700'}`}>
          {task.assignee}
        </span>
      </div>
    </article>
  )
}