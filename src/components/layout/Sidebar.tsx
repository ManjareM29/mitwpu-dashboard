import { 
  LayoutDashboard, 
  GraduationCap, 
  FlaskConical, 
  Building2,
  BarChart3,
  MessageSquareText,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { departments } from "@/data/mockData";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Departments", url: "/departments", icon: GraduationCap },
  { title: "Lab Analytics", url: "/labs", icon: FlaskConical },
  { title: "Classrooms", url: "/classrooms", icon: Building2 },
  { title: "Performance", url: "/performance", icon: BarChart3 },
  { title: "Feedback", url: "/feedback", icon: MessageSquareText },
];

const Sidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isDeptActive = departments.some(d => location.pathname.includes(`/department/${d.id}`));

  return (
    <SidebarComponent collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-dept-cse flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg">MIT-WPU</h1>
              <p className="text-xs text-muted-foreground">College Analytics</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && isDeptActive && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2 mt-4">
              Departments
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {departments.map((dept) => (
                  <SidebarMenuItem key={dept.id}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={`/department/${dept.id}`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors group"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-${dept.color}`} />
                          <span className="text-sm">{dept.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <SidebarTrigger className="w-full justify-center" />
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
