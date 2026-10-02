import { useMemo, useState } from 'react'
import { Plus, ShieldCheck } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { KanbanColumn } from '../components/KanbanColumn'
import type { BoardTask, TaskPriority, TaskStatus } from '../types/kanban'

const statuses: TaskStatus[] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done']
const initialTasks: BoardTask[] = [
    { id: 'TF-112', title: 'Optimize PostgreSQL query on User Management table', status: 'Backlog', priority: 'Low', assignee: 'AM', comments: 2, attachments: 1 },
    { id: 'TF-118', title: 'Document the new deployment workflow', status: 'Backlog', priority: 'Medium', assignee: 'JL', dueDate: 'Mar 28' },
    { id: 'TF-121', title: 'Add audit events for project settings', status: 'Backlog', priority: 'Medium', assignee: 'SP', comments: 1 },
    { id: 'TF-125', title: 'Review empty states across the workspace', status: 'Backlog', priority: 'Low', assignee: 'WM' },
    { id: 'TF-109', title: 'Implement RBAC middleware for Admin Center endpoints', status: 'To Do', priority: 'High', assignee: 'SP', dueDate: 'Mar 26' },
    { id: 'TF-115', title: 'Add sprint summary to project dashboard', status: 'To Do', priority: 'Medium', assignee: 'JL', comments: 3 },
    { id: 'TF-123', title: 'Create reusable confirmation dialog', status: 'To Do', priority: 'Low', assignee: 'AM' },
    { id: 'TF-104', title: 'Refactor Task Allocation API endpoint & schema checks', status: 'In Progress', priority: 'High', assignee: 'AM', dueDate: 'Today', subtasks: { complete: 3, total: 5 } },
    { id: 'TF-107', title: 'Connect GitHub issue sync to project settings', status: 'In Progress', priority: 'Medium', assignee: 'JL', dueDate: 'Mar 27', subtasks: { complete: 2, total: 4 } },
    { id: 'TF-119', title: 'Improve task search ranking', status: 'In Progress', priority: 'High', assignee: 'SP', comments: 4 },
    { id: 'TF-101', title: 'Add team member permissions panel', status: 'In Review', priority: 'High', assignee: 'WM', dueDate: 'Mar 25', comments: 2 },
    { id: 'TF-110', title: 'Polish responsive navigation', status: 'In Review', priority: 'Medium', assignee: 'AM' },
    { id: 'TF-116', title: 'Update task activity timeline', status: 'In Review', priority: 'Low', assignee: 'JL', attachments: 2 },
    { id: 'TF-122', title: 'Add CSV export to sprint report', status: 'In Review', priority: 'Medium', assignee: 'SP' },
    { id: 'TF-096', title: 'Ship project-level notification preferences', status: 'Done', priority: 'Medium', assignee: 'SP', dueDate: 'Mar 20' },
    { id: 'TF-098', title: 'Fix overdue task indicator', status: 'Done', priority: 'High', assignee: 'AM' },
    { id: 'TF-099', title: 'Add keyboard focus styles', status: 'Done', priority: 'Low', assignee: 'JL' },
    { id: 'TF-100', title: 'Build sprint velocity chart', status: 'Done', priority: 'Medium', assignee: 'WM' },
    { id: 'TF-102', title: 'Improve project switcher loading state', status: 'Done', priority: 'Low', assignee: 'SP' },
    { id: 'TF-103', title: 'Add task labels and color indicators', status: 'Done', priority: 'Medium', assignee: 'AM' },
    { id: 'TF-105', title: 'Refine sign-in error messaging', status: 'Done', priority: 'Low', assignee: 'JL' },
    { id: 'TF-106', title: 'Create sprint planning template', status: 'Done', priority: 'Medium', assignee: 'WM' },
]

type ViewMode = 'Board View' | 'List View' | 'Analytics' | 'Settings'

export default function KanbanPage() {
    const [tasks, setTasks] = useState(initialTasks)
    const [priorityFilter, setPriorityFilter] = useState<'All Priorities' | TaskPriority>('All Priorities')
    const [view, setView] = useState<ViewMode>('Board View')
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('Medium')
    const visibleTasks = useMemo(() => tasks.filter((task) => priorityFilter === 'All Priorities' || task.priority === priorityFilter), [priorityFilter, tasks])
    const completed = tasks.filter((task) => task.status === 'Done').length
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length

    const startDragging = (event: React.DragEvent<HTMLElement>, taskId: string) => {
        event.dataTransfer.setData('text/plain', taskId)
        event.dataTransfer.effectAllowed = 'move'
    }
    const moveTask = (event: React.DragEvent<HTMLElement>, status: TaskStatus) => {
        event.preventDefault()
        const taskId = event.dataTransfer.getData('text/plain')
        if (taskId) setTasks((current) => current.map((task) => task.id === taskId ? { ...task, status } : task))
    }
    const createTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const title = newTaskTitle.trim()
        if (!title) return
        const nextNumber = Math.max(...tasks.map((task) => Number(task.id.replace('TF-', '')))) + 1
        setTasks((current) => [{ id: `TF-${nextNumber}`, title, status: 'Backlog', priority: newTaskPriority, assignee: 'WM' }, ...current])
        setNewTaskTitle('')
        setNewTaskPriority('Medium')
        setIsCreateOpen(false)
    }

    return (
        <main className="-m-4 flex min-h-[calc(100vh-4rem)] flex-col bg-slate-50 text-slate-900">
            <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3 md:px-8">
                <nav aria-label="Project views" className="flex items-center gap-1 overflow-x-auto">
                    {(['Board View', 'List View', 'Analytics', 'Settings'] as ViewMode[]).map((tab) => (
                        <button key={tab} onClick={() => setView(tab)} className={`shrink-0 border-b-2 px-3 py-3 text-xs font-bold uppercase tracking-wide transition-colors sm:px-4 sm:text-sm ${view === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>{tab}</button>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <div className="hidden -space-x-2 sm:flex" aria-label="Sprint members">
                        {['JL', 'SP', 'AM'].map((initials, index) => <Avatar key={initials} size="sm" className={`ring-2 ring-white ${index === 0 ? 'bg-indigo-100 text-indigo-700' : index === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}><AvatarFallback>{initials}</AvatarFallback></Avatar>)}
                    </div>
                    <label className="sr-only" htmlFor="priority-filter">Filter by priority</label>
                    <select id="priority-filter" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as typeof priorityFilter)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                        <option>All Priorities</option><option>High</option><option>Medium</option><option>Low</option>
                    </select>
                    <Button onClick={() => setIsCreateOpen(true)} className="h-10 bg-slate-950 px-3 text-white hover:bg-slate-800 sm:px-4"><Plus /><span className="hidden sm:inline">New Task</span></Button>
                </div>
            </div>

            <section className="px-5 pb-4 pt-6 md:px-8 md:pt-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Sprint 24</p><h1 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">Kanban Board</h1><p className="mt-1 text-sm text-slate-500">Core Deliverables <span className="px-1.5 text-slate-300">•</span> March 15 – March 29</p></div>
                    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm sm:gap-6">
                        <div><span className="font-bold text-slate-900">{tasks.length}</span><span className="ml-1.5 text-slate-500">Total Tasks</span></div><span className="hidden h-5 w-px bg-slate-200 sm:block" />
                        <div><span className="font-bold text-orange-600">4 days</span><span className="ml-1.5 text-slate-500">remaining</span></div><span className="hidden h-5 w-px bg-slate-200 sm:block" />
                        <div><span className="text-slate-500">Velocity:</span><span className="ml-1.5 font-bold text-slate-900">42 pts</span></div>
                    </div>
                </div>
            </section>

            <section className="min-h-0 flex-1 px-5 pb-5 md:px-8" aria-label={`${view} content`}>
                {view === 'Board View' && <div className="flex h-[min(62vh,38rem)] min-h-[24rem] gap-4 overflow-x-auto pb-1">{statuses.map((status) => <KanbanColumn key={status} status={status} tasks={visibleTasks.filter((task) => task.status === status)} onDragStart={startDragging} onDrop={moveTask} />)}</div>}
                {view === 'List View' && <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="grid grid-cols-[minmax(13rem,2fr)_minmax(7rem,1fr)_minmax(7rem,1fr)_minmax(6rem,0.7fr)] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500"><span>Task</span><span>Stage</span><span>Priority</span><span>Owner</span></div>
                    <div className="max-h-[min(62vh,38rem)] overflow-auto">{visibleTasks.map((task) => <div key={task.id} className="grid grid-cols-[minmax(13rem,2fr)_minmax(7rem,1fr)_minmax(7rem,1fr)_minmax(6rem,0.7fr)] items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-0"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{task.title}</p><p className="mt-1 font-mono text-xs text-slate-400">{task.id}</p></div><span className="text-sm text-slate-600">{task.status}</span><Badge variant="outline" className="w-fit">{task.priority}</Badge><span className="text-sm font-semibold text-slate-600">{task.assignee}</span></div>)}</div>
                </div>}
                {view === 'Analytics' && <div className="grid gap-4 sm:grid-cols-3"><SummaryMetric label="Completed" value={`${completed} / ${tasks.length}`} detail="Tasks shipped this sprint" /><SummaryMetric label="In progress" value={String(inProgress)} detail="Tasks actively being worked" /><SummaryMetric label="Sprint velocity" value="42 pts" detail="Across the last 3 sprints" /></div>}
                {view === 'Settings' && <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-base font-bold text-slate-900">Sprint settings</h2><p className="mt-1 text-sm text-slate-500">Core Deliverables · March 15 – March 29</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-slate-700">Sprint name<input value="Sprint 24 Core Deliverables" readOnly className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="text-sm font-medium text-slate-700">Sprint goal<input value="Ship core project workflows" readOnly className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label></div></div>}
            </section>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-3 text-xs text-slate-500 md:px-8">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-600" />Showing {visibleTasks.length} tasks across 5 stages <span className="hidden sm:inline">• Synced with Git commits (main branch)</span></span>
                <span className="inline-flex items-center gap-4"><span className="hidden sm:inline">Keyboard shortcuts (Press ?)</span><span>Auto-save enabled</span></span>
            </footer>

            {isCreateOpen && <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/35 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCreateOpen(false) }}>
                <form onSubmit={createTask} role="dialog" aria-modal="true" aria-labelledby="create-task-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
                    <div className="mb-5"><h2 id="create-task-title" className="text-lg font-bold text-slate-900">Create a task</h2><p className="mt-1 text-sm text-slate-500">Add a task to the sprint backlog.</p></div>
                    <label htmlFor="task-title" className="text-sm font-semibold text-slate-700">Task name</label><input id="task-title" autoFocus required value={newTaskTitle} onChange={(event) => setNewTaskTitle(event.target.value)} placeholder="What needs to get done?" className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    <label htmlFor="task-priority" className="mt-4 block text-sm font-semibold text-slate-700">Priority</label><select id="task-priority" value={newTaskPriority} onChange={(event) => setNewTaskPriority(event.target.value as TaskPriority)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"><option>Low</option><option>Medium</option><option>High</option></select>
                    <div className="mt-6 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800">Create task</Button></div>
                </form>
            </div>}
        </main>
    )
}

function SummaryMetric({ label, value, detail }: { label: string; value: string; detail: string }) {
    return <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-sm text-slate-500">{detail}</p></div>
}