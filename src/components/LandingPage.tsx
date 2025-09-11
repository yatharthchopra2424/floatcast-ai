import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Database, Map, MessageCircle, TrendingUp, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-depth">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-ocean-primary" />
              <span className="text-2xl font-bold text-ocean-deep">FloatChat</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-ocean-primary">
                AI-Powered Ocean Data
              </Badge>
              <Link to="/dashboard">
                <Button variant="ocean">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-ocean-deep mb-6 leading-tight">
              Discover Ocean Data with{" "}
              <span className="bg-gradient-ocean bg-clip-text text-transparent">
                Natural Language
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              FloatChat transforms complex ARGO ocean data into accessible insights. 
              Ask questions in plain English and get interactive visualizations, 
              charts, and clear answers powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  Start Exploring Data
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
              Powerful Ocean Data Analytics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of oceanographic research with AI-powered data discovery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-ocean transition-wave cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-ocean-deep">Natural Language Queries</CardTitle>
                <CardDescription>
                  Ask questions in plain English like "Show me temperature profiles in the Indian Ocean"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No technical expertise required. Our AI understands your questions and 
                  translates them into precise data queries.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-ocean transition-wave cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-ocean-deep">Interactive Visualizations</CardTitle>
                <CardDescription>
                  Get dynamic maps, charts, and 3D visualizations of ocean data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore ARGO float trajectories, temperature profiles, and salinity data 
                  through beautiful, interactive dashboards.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-ocean transition-wave cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-ocean-deep">Predictive Analytics</CardTitle>
                <CardDescription>
                  Forecast ocean conditions with machine learning models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Leverage advanced ML models to predict temperature changes, 
                  identify anomalies, and understand ocean trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-20 px-4 bg-ocean-surface">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FloatChat combines cutting-edge AI with robust oceanographic data infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ocean-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ocean-deep mb-2">AI-Powered Conversations</h3>
                  <p className="text-muted-foreground">
                    Large Language Models with Retrieval-Augmented Generation (RAG) 
                    understand context and provide accurate, relevant responses.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ocean-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ocean-deep mb-2">ARGO Data Integration</h3>
                  <p className="text-muted-foreground">
                    Direct access to thousands of autonomous ocean floats collecting 
                    real-time temperature, salinity, and pressure data worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ocean-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ocean-deep mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Machine learning models for forecasting, anomaly detection, 
                    and pattern recognition in complex oceanographic datasets.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-float">
              <h3 className="text-xl font-semibold text-ocean-deep mb-4">Example Query</h3>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <p className="text-ocean-deep font-medium">
                  "Show me the temperature profiles in the Indian Ocean for last month"
                </p>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-ocean-primary rounded-full"></div>
                  <span>AI processes natural language query</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-ocean-accent rounded-full"></div>
                  <span>Searches ARGO database for relevant data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-ocean-primary rounded-full"></div>
                  <span>Generates interactive visualizations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-ocean-accent rounded-full"></div>
                  <span>Provides contextual insights and analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore Ocean Data?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join researchers, scientists, and ocean enthusiasts in discovering 
            insights from the world's largest oceanographic dataset.
          </p>
          <Link to="/dashboard">
            <Button variant="float" size="lg">
              Start Your Discovery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-deep py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Waves className="h-6 w-6 text-ocean-primary" />
              <span className="text-xl font-bold text-white">FloatChat</span>
            </div>
            <div className="text-white/60 text-sm">
              © 2024 FloatChat. Democratizing ocean data discovery through AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;