import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Bot, Database, Map, MessageCircle, TrendingUp, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const faqData = [
    {
      question: "What is Argo?",
      answer: "Argo is an international program to collect information on temperature, salinity, pressure, and biogeochemical components such as oxygen, pH, nitrates, chlorophyll, etc. of the world's oceans. Argo uses robotic floats that spend most of their life drifting below the ocean surface. They make the temperature, salinity, pressure and biogeochemical measurements when they come up to the surface and after transmitting their data to satellites, they return to depth to drift for 10 days. Currently, there are roughly 4000 floats producing 100,000+ temperature/salinity profiles per year."
    },
    {
      question: "Why is it called Argo?",
      answer: "In Greek mythology, Argo was the ship in which Jason and the Argonauts set sail to search for the golden fleece. Argo floats sail the 21st century seas and Argo is teamed with a satellite called JASON-1 that measures the shape of the ocean surface. Data from Argo and JASON-1 together monitor the ocean currents, the oceans' transport of heat and freshwater around the globe and sea-level rise."
    },
    {
      question: "What do the floats look like and how do they work?",
      answer: "The floats have a pressure case made of aluminium that is about 1.3m long and about 20cm diameter. They weigh about 40kg. On the top is an antenna to communicate with the satellites that fix the float's position and receive the data. Also on the top are the temperature, salinity and pressure sensors. At the bottom of the float in a protective cover is a bladder that is connected to the inside of the float. The floats are designed so that with the bladder empty they have the same density as seawater at the depth at which they drift."
    },
    {
      question: "How are the floats powered and how long do they work for?",
      answer: "The floats are powered by batteries. Some use manganese/alkali batteries like you can buy in shops, but most floats that are deployed now use higher-powered lithium batteries. The floats are designed to do about 150 cycles and so should last 3 – 5 years. The lifetime depends on the depth to which they profile and the surface water density in which the float is operating."
    },
    {
      question: "Who uses the data?",
      answer: "Argo data are used by weather and climate centers to help understand the way the oceans affect climate. These centers are working to improve forecasts of El Nino events and to understand other climate features like monsoons and global warming. Argo is the main source of subsurface temperature and salinity from the deep oceans. In addition, many researchers use Argo data to help better understand fundamentals about the ocean."
    },
    {
      question: "Where can you get the data and how much does it cost?",
      answer: "The most important thing about Argo data is that it is FREE to anyone wishing to use it. The data can be obtained from two global data servers, one in France and one in the USA. There are also gridded products based on Argo data which may be more appropriate for some scientists. If you're interested in seeing Argo data without having to download it to your computer, there are various Argo visualizations."
    },
    {
      question: "How accurate is the Argo data?",
      answer: "The temperatures in the Argo profiles are accurate to ± 0.002°C and pressures are accurate to ± 2.4dbar. For salinity, there are two answers. The data delivered in real time are sometimes affected by sensor drift. For many floats, this drift is small, and the uncorrected salinities are accurate to ± .01 psu. At a later stage, salinities are corrected by expert examination, comparing older floats with newly deployed instruments and with ship-based data."
    },
    {
      question: "How much does the project cost and who pays?",
      answer: "Each float costs about $20,000 USD and this cost about doubles when the cost of deploying the float, handling the data and running the project is taken into account. The array has roughly 3800 floats and each float provides a profile of temperature and salinity every 10 days. The Program collects about 140,000 profiles a year at a cost of around $200 per profile. 28 countries have contributed floats to the array with the USA providing about half the floats."
    },
    {
      question: "When will the Argo array be complete?",
      answer: "The Argo array reached its original design target of 3000 floats in November 2007, and can be maintained at that level as long as national commitments provide about 600 floats per year. As technologies have evolved, so has the Argo array design which has expanded to include marginal seas and sea-ice regions in the high latitudes. Additionally, there are two new Argo missions: the Deep Argo mission and the BioGeoChemical Argo (BGC-Argo) mission."
    },
    {
      question: "What sensors are accepted in Argo? Can I add a sensor to an Argo float?",
      answer: "There are three different stages of sensors in the Argo data stream: accepted, global pilot and experimental. As profiling floats become more prevalent, scientists outside of established Argo National Programs are considering adding their profiling floats to Argo. To address this, the Argo Steering Team (AST) and Argo Data Management Team (ADMT) have developed a framework for entry into the Argo data stream based on Stages I – III."
    },
    {
      question: "How is Argo managed?",
      answer: "Argo has an international Steering Team and a Data Management Team made up of scientists from countries involved in Argo. An Argo Technical Coordinator monitors the array and registers each float deployment in accordance with international agreements. Argo also has an international Director. Each country finds its own funding and sets its own priorities for where floats are deployed in consultation with other countries."
    },
    {
      question: "What happens when floats stop working?",
      answer: "Most floats will \"die\" when the battery is too weak to pump the float to the surface. These floats will drift around in the deep ocean until the pressure case corrodes, water leaks in, and the float falls to the sea bed. Over time on the ocean floor, the aluminum hull will slowly degrade into harmless oxides which will be spread around by the ocean's currents."
    },
    {
      question: "Do the floats pose any hazard to people, wildlife, the environment or shipping?",
      answer: "The floats make no noise in the ocean and they do not contain materials that are not found elsewhere in the oceans. We take care to ensure that they are handled properly if they are found by fishermen or beachcombers. They are small and light enough to pose no significant hazard to ships and boats."
    },
    {
      question: "What should I do if I find a float?",
      answer: "In the rare case that a float is found on a beach we can learn a great deal from it about why it failed. First look for the float's identification. If you can safely do so, move the float to a location where it can be stored without getting too hot and where it cannot be interfered with by other people. Follow the instructions on the label and inform the Argo Information Centre in France."
    },
    {
      question: "What if I have questions about Argo or the data?",
      answer: "If you have general questions about Argo, please send them to argo@ucsd.edu. If you have more technical questions about the data, please look at the \"DATA FAQ\" page or e-mail the support desk (support@argo.net)."
    }
  ];
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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about ARGO ocean floats and data
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg bg-card hover:shadow-float transition-wave"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline [&[data-state=open]]:text-ocean-primary">
                    <span className="font-semibold text-ocean-deep pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto bg-ocean-surface">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                  Still have questions?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our AI assistant can help you explore ARGO data and answer specific questions about ocean measurements.
                </p>
                <Link to="/dashboard">
                  <Button variant="ocean">
                    Ask Our AI Assistant
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
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