import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Database, 
  Globe, 
  Activity,
  Thermometer,
  Droplets,
  MapPin,
  Calendar,
  Users,
  ArrowUpRight
} from "lucide-react";

const DashboardContent = () => {
  const statsCards = [
    {
      title: "Active ARGO Floats",
      value: "4,127",
      change: "+23 this week",
      icon: Activity,
      color: "text-ocean-primary"
    },
    {
      title: "Temperature Profiles",
      value: "156.2K",
      change: "+1.2K today",
      icon: Thermometer,
      color: "text-red-500"
    },
    {
      title: "Salinity Measurements",
      value: "89.7K",
      change: "+890 today",
      icon: Droplets,
      color: "text-blue-500"
    },
    {
      title: "Global Coverage",
      value: "89%",
      change: "Ocean monitoring",
      icon: Globe,
      color: "text-green-500"
    }
  ];

  const recentQueries = [
    "Temperature anomalies in the North Atlantic",
    "Salinity trends near the Gulf Stream",
    "ARGO float trajectories in the Pacific",
    "Deep water formation in the Southern Ocean"
  ];

  const quickActions = [
    { title: "Ocean Temperature Map", description: "View global temperature distribution", icon: Thermometer },
    { title: "Salinity Patterns", description: "Explore salinity variations", icon: Droplets },
    { title: "Float Trajectories", description: "Track ARGO float movements", icon: MapPin },
    { title: "Historical Trends", description: "Analyze long-term patterns", icon: TrendingUp }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-depth rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ocean-deep mb-2">
              Welcome to FloatChat Dashboard
            </h1>
            <p className="text-muted-foreground">
              Explore ocean data through natural language conversations with AI
            </p>
          </div>
          <Badge variant="secondary" className="text-ocean-primary">
            <Calendar className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-float transition-wave">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ocean-deep">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-ocean-deep">Quick Actions</CardTitle>
            <CardDescription>
              Jump into specific ocean data visualizations
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 justify-start text-left hover:bg-ocean-surface transition-wave"
              >
                <div className="flex items-start space-x-3">
                  <action.icon className="h-5 w-5 text-ocean-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-ocean-deep">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 ml-auto text-ocean-primary" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ocean-deep">Recent Queries</CardTitle>
            <CardDescription>
              Popular ocean data questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentQueries.map((query, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-ocean-surface transition-wave cursor-pointer">
                <div className="w-2 h-2 bg-ocean-primary rounded-full"></div>
                <span className="text-sm text-ocean-deep">{query}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Data Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-ocean-deep flex items-center">
              <Database className="h-5 w-5 mr-2 text-ocean-primary" />
              Data Sources
            </CardTitle>
            <CardDescription>
              Current ocean monitoring infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-ocean-surface rounded-lg">
              <div>
                <div className="font-medium text-ocean-deep">ARGO Float Network</div>
                <div className="text-sm text-muted-foreground">Autonomous ocean profilers</div>
              </div>
              <Badge variant="secondary" className="text-green-600">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-ocean-surface rounded-lg">
              <div>
                <div className="font-medium text-ocean-deep">NOAA THREDDS</div>
                <div className="text-sm text-muted-foreground">Data catalog service</div>
              </div>
              <Badge variant="secondary" className="text-green-600">Connected</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-ocean-surface rounded-lg">
              <div>
                <div className="font-medium text-ocean-deep">NetCDF Processing</div>
                <div className="text-sm text-muted-foreground">Scientific data format</div>
              </div>
              <Badge variant="secondary" className="text-green-600">Ready</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-ocean-deep flex items-center">
              <Users className="h-5 w-5 mr-2 text-ocean-primary" />
              AI Capabilities
            </CardTitle>
            <CardDescription>
              Advanced ocean data analysis features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-ocean-surface rounded-lg">
              <div className="w-2 h-2 bg-ocean-primary rounded-full"></div>
              <div>
                <div className="font-medium text-ocean-deep">Natural Language Processing</div>
                <div className="text-sm text-muted-foreground">Understand complex queries</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-ocean-surface rounded-lg">
              <div className="w-2 h-2 bg-ocean-accent rounded-full"></div>
              <div>
                <div className="font-medium text-ocean-deep">Predictive Analytics</div>
                <div className="text-sm text-muted-foreground">Forecast ocean conditions</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-ocean-surface rounded-lg">
              <div className="w-2 h-2 bg-ocean-primary rounded-full"></div>
              <div>
                <div className="font-medium text-ocean-deep">Interactive Visualizations</div>
                <div className="text-sm text-muted-foreground">Dynamic charts and maps</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;