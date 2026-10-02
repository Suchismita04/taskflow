import { Link, useLocation } from "react-router-dom";
import {
    AlertTriangle,
    BarChart3,
    FileText,
    Headphones,
    KanbanSquare,
    ListTodo,
    ShieldCheck,
    UsersRound,
    Zap,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

export const AppSidebar: React.FC = () => {
    const location = useLocation();
    const menuItems = [
        { name: 'Kanban Board', uri: '/kanban', icon: KanbanSquare },
        { name: 'Backlog', uri: '/kanban?view=backlog', icon: ListTodo },
        { name: 'Sprints', uri: '/kanban?view=sprints', icon: Zap },
        { name: 'Task Allocation', uri: '/kanban?view=allocation', icon: UsersRound },
        { name: 'Bug Tracking', uri: '/kanban?view=bugs', icon: AlertTriangle },
        { name: 'Reports', uri: '/kanban?view=reports', icon: BarChart3 },
        { name: 'Policy Management', uri: '/admin/policy', icon: ShieldCheck },
        { name: 'User Management', uri: '/admin/user', icon: UsersRound },
    ];

    return (
        <Sidebar className="border-r border-slate-200 bg-white text-slate-600" collapsible="offcanvas">
            <SidebarHeader className="px-4 pb-0 pt-8">
                <div className="space-y-1">
                    <p className="text-lg font-bold leading-tight tracking-tight text-slate-900">Project Hub</p>
                    <p className="flex items-center gap-2 text-sm text-slate-500"><span className="size-2 rounded-full bg-emerald-500" />Sprint 24 (Active)</p>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4 pt-4">
                <SidebarMenu className="">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.uri;
                        const content = (
                            <>
                                <item.icon className="size-6 shrink-0 stroke-[2.5]" />
                                <span
                                    className="text-[0.95rem] font-normal uppercase leading-tight tracking-[0.03em]"
                                    style={{ overflow: 'visible', textOverflow: 'clip', whiteSpace: 'normal' }}
                                >
                                    {item.name}
                                </span>
                            </>
                        );

                        return (
                            <SidebarMenuItem key={item.name}>
                                {/*  {item.disabled ? (
                                    <SidebarMenuButton
                                        size="sm"
                                        className="min-h-16 gap-3 rounded-none px-3 py-3 text-[#505050] hover:bg-transparent hover:text-[#505050]"
                                    >
                                        {content}
                                    </SidebarMenuButton>
                                ) : (
                                    <SidebarMenuButton
                                        size="sm"
                                        isActive={isActive}
                                        render={<Link to={item.uri} />}
                                        className="min-h-16 gap-3 rounded-2xl px-3 py-3 text-[#505050] hover:bg-[#e6e6e6] hover:text-black data-active:bg-black data-active:text-white data-active:hover:bg-black data-active:hover:text-white"
                                    >
                                        {content}
                                    </SidebarMenuButton>
                                )} */}
                                <SidebarMenuButton
                                    size="sm"
                                    isActive={isActive}
                                    render={<Link to={item.uri} />}
                                    className="min-h-12 gap-3 rounded-xl px-3 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-950 data-active:bg-slate-950 data-active:text-white data-active:hover:bg-slate-950 data-active:hover:text-white"
                                >
                                    {content}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="mt-auto p-0">
                <div className="border-t border-[#c8c8c8] px-4 pb-7 pt-6">
                    <SidebarMenu className="gap-4">
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className="h-auto gap-3 rounded-none p-0 text-[#505050] hover:bg-transparent hover:text-black">
                                <FileText className="size-5 shrink-0 stroke-[2.5]" />
                                <span className="text-[1rem] font-normal uppercase tracking-[0.03em]">System Logs</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className="h-auto gap-3 rounded-none p-0 text-[#505050] hover:bg-transparent hover:text-black">
                                <Headphones className="size-5 shrink-0 stroke-[2.5]" />
                                <span className="text-[1rem] font-normal uppercase tracking-[0.03em]">Support</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}