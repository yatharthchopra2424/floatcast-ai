import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Map, 
  MessageCircle, 
  Database, 
  TrendingUp, 
  Settings, 
  Globe,
  Thermometer,
  Droplets,
  Activity,
  Waves
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { title: "Chat", url: "/dashboard", icon: MessageCircle },
  { title: "Ocean Map", url: "/dashboard/map", icon: Map },
  { title: "Data Explorer", url: "/dashboard/data", icon: Database },
  { title: "Analytics", url: "/dashboard/analytics", icon: TrendingUp },
];

const dataCategories = [
  { title: "Temperature", url: "/dashboard/temperature", icon: Thermometer },
  { title: "Salinity", url: "/dashboard/salinity", icon: Droplets },
  { title: "Pressure", url: "/dashboard/pressure", icon: Activity },
  { title: "Global Overview", url: "/dashboard/global", icon: Globe },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-ocean-light text-ocean-deep font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Waves className={`${collapsed ? 'h-6 w-6' : 'h-8 w-8'} text-ocean-primary`} />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-bold text-ocean-deep">FloatChat</span>
                <Badge variant="secondary" className="text-xs w-fit">
                  Ocean AI
                </Badge>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-ocean-deep font-semibold">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-ocean-deep font-semibold">
            Data Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataCategories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard/settings" className={getNavCls}>
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="bg-ocean-surface rounded-lg p-3">
              <div className="text-sm text-ocean-deep font-medium mb-1">
                ARGO Data Status
              </div>
              <div className="text-xs text-muted-foreground">
                Live connection to 4,000+ ocean floats
              </div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-green-600">Active</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}