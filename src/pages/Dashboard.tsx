import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import ChatBox from "@/components/ChatBox";
import DashboardContent from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  BarChart3, 
  Waves,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between border-b border-border bg-card px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <Waves className="h-6 w-6 text-ocean-primary" />
                <span className="text-xl font-bold text-ocean-deep">FloatChat</span>
                <Badge variant="secondary" className="text-ocean-primary">
                  Dashboard
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                ARGO Live
              </Badge>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b border-border bg-card px-6 py-2">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="overview" className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>AI Chat</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="flex-1 overflow-auto">
                <DashboardContent />
              </TabsContent>

              <TabsContent value="chat" className="flex-1 overflow-hidden">
                <div className="h-full">
                  <ChatBox />
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;