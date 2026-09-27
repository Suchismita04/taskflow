import { Link, useLocation } from "react-router-dom";
import {
    FileText,
    Headphones,
    LayoutDashboard,
    ShieldCheck,
    UsersRound,
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
        // { name: 'Admin Dashboard', uri: '/admin', icon: LayoutDashboard, disabled: true },
        { name: 'Policy Management', uri: '/admin/policy', icon: ShieldCheck },
        { name: 'User Management', uri: '/admin/user', icon: UsersRound },
    ];

    return (
        <Sidebar className="border-r border-[#d3d3d3] bg-[#f7f7f7] text-[#4d4d4d]" collapsible="offcanvas">
            <SidebarHeader className="px-4 pb-0 pt-18">
                <div className="space-y-1">
                    <p className="text-[1.12rem] font-bold leading-tight tracking-[-0.04em] text-black">Admin Center</p>
                    <p className="text-[1.12rem] font-normal leading-tight tracking-[-0.04em] text-[#555]">System Control</p>
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
                                    className="min-h-16 gap-3 rounded-2xl px-3 py-3 text-[#505050] hover:bg-[#e6e6e6] hover:text-black data-active:bg-black data-active:text-white data-active:hover:bg-black data-active:hover:text-white"
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