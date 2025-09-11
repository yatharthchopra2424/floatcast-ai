import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Waves, 
  Globe, 
  Database, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  ArrowRight,
  Thermometer,
  Droplets,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-depth">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-ocean-primary" />
              <span className="text-2xl font-bold text-ocean-deep">FloatChat</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ocean">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-ocean-primary mb-4">
              About the ARGO Program
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-ocean-deep mb-6 leading-tight">
              Understanding Our{" "}
              <span className="bg-gradient-ocean bg-clip-text text-transparent">
                Ocean's Climate
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how 4,000+ robotic floats are revolutionizing our understanding 
              of ocean climate and helping predict future changes in our planet's most 
              vital system.
            </p>
          </div>
        </div>
      </section>

      {/* What is Argo */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              What is Argo?
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Argo is an international program that measures water properties across the world's ocean 
                  using a fleet of robotic instruments that drift with the ocean currents and move up and 
                  down between the surface and a mid-water level. Each instrument (float) spends almost 
                  all its life below the surface.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The name Argo was chosen because the array of floats works in partnership with the Jason 
                  earth observing satellites that measure the shape of the ocean surface. (In Greek mythology 
                  Jason sailed on his ship the Argo in search of the golden fleece).
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-ocean-deep">4,000+ Floats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Robotic instruments continuously monitoring ocean conditions worldwide
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-ocean-deep">400+ Profiles Daily</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Over 13,000 data profiles collected each month from ocean depths
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-ocean-deep">Global Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitoring all major ocean basins for climate research
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Aims and Goals */}
      <section className="py-20 px-4 bg-ocean-surface">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              Mission and Goals
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The data that Argo collects describes the temperature and salinity of the water and 
                  some of the floats measure other properties that describe the biology/chemistry of 
                  the ocean. The main reason for collecting these data is to help us understand the 
                  oceans' role in earth's climate and so be able to make improved estimates of how 
                  it will change in the future.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  For example, the changes in sea level (once the tides are averaged out) depend partly 
                  on the melting of icecaps and partly on the amount of heat stored in the oceans. 
                  Argo's temperature measurements allow us to calculate how much heat is stored and to 
                  monitor from year to year how the distribution of heat changes with depth and from 
                  area to area.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-6 w-6 text-ocean-primary" />
                    <CardTitle className="text-ocean-deep">Temperature Monitoring</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track ocean heat content and distribution to understand climate patterns 
                    and sea level rise.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-6 w-6 text-ocean-primary" />
                    <CardTitle className="text-ocean-deep">Salinity Patterns</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor changes in global rainfall patterns through ocean salinity variations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              How Argo Works
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Each Argo float (costing between $25,000 and $185,000 depending on the individual 
                  float's technical specification) is launched from a ship. The float's weight is 
                  carefully adjusted so that, as it sinks, it eventually stabilizes at a pre-set 
                  level, usually 1 km.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ten days later, an internal battery-driven pump transfers oil between a reservoir 
                  inside the float and an external bladder. This makes the float first descend to 2km 
                  and then return to the surface measuring ocean properties as it rises. The data and 
                  the float position are relayed to satellites and then on to receiving stations on shore.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-ocean-deep mb-2">Deploy</h3>
                <p className="text-sm text-muted-foreground">Float launched from ship, sinks to 1km depth</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-ocean-deep mb-2">Drift</h3>
                <p className="text-sm text-muted-foreground">Drifts with currents for 10 days at depth</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-ocean-deep mb-2">Profile</h3>
                <p className="text-sm text-muted-foreground">Descends to 2km, then rises measuring properties</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold text-ocean-deep mb-2">Transmit</h3>
                <p className="text-sm text-muted-foreground">Surfaces to send data via satellite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Delivery */}
      <section className="py-20 px-4 bg-ocean-surface">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              Data Delivery and Access
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The float measurements are sent to regional data centres where they are given 
                  rigorous quality checks and then passed to two global data centres from where 
                  they can be accessed by anyone wishing to use them. Some users have applications 
                  that require rapid access and so Argo aims for most "real-time" data to be 
                  available within 12 hrs.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A fundamental rule for Argo is that all data are freely and openly available.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-float transition-wave">
                <CardHeader>
                  <CardTitle className="text-ocean-deep flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-ocean-primary" />
                    Real-time Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                  Available within 12 hours for operational weather and climate forecasting.
                  </p>
                  <Badge variant="secondary" className="text-green-600">
                    Under 12 hours
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-float transition-wave">
                <CardHeader>
                  <CardTitle className="text-ocean-deep flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-ocean-primary" />
                    Quality Controlled
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Higher-quality version after comparisons between floats and research ships.
                  </p>
                  <Badge variant="secondary" className="text-ocean-primary">
                    Research Grade
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* International Collaboration */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              International Collaboration
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  There is no central funding for Argo. Each of the 30 countries that operate floats 
                  obtains their own national funding to buy floats, prepare and launch them and to 
                  process and distribute the data. The Argo Program is managed by teams of scientists 
                  and data experts who ensure that the program is run as efficiently and effectively 
                  as possible.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Argo is part of the Global Ocean and Global Climate Observing Systems. The total 
                  annual cost of Argo is estimated at least $40 million each year.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-ocean-deep">30 Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    International collaboration with participating nations worldwide
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-ocean-deep">$40M Annual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Total program cost shared across participating countries
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-float transition-wave">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-ocean-deep">Free Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All data freely and openly available to anyone worldwide
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 px-4 bg-ocean-surface">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              Environmental Impact
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  All techniques used to obtain information about our environment come with some 
                  impact and Argo is no exception. However, its impact is small and both the float 
                  manufacturers and Argo scientists are always looking for ways to reduce that impact.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The vast majority of floats fail when their batteries are exhausted and they 
                  continue to drift at depth until they eventually leak and sink to the seabed. 
                  A few fail at the surface and eventually drift to shore where they may be recovered.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a comparison, it is estimated that hundreds up to ten thousand containers are 
                  lost off ships each year. If 200 containers are lost, with the capacity of holding 
                  60,000 lbs, that would contribute 6,000 tons of garbage each year into the ocean 
                  compared to Argo's less than 2 tons per year.
                </p>
              </CardContent>
            </Card>

            <div className="bg-card rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-ocean-deep mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Minimal Environmental Impact
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-2">
                    Argo annual contribution: Under 2 tons
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Shipping containers lost:</strong> 6,000+ tons annually
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2">
                    <strong>Materials:</strong> Naturally occurring ocean elements
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Recovery:</strong> Shore-drifted floats can be recovered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Impact */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-8 text-center">
              Scientific Achievements
            </h2>
            
            <Card className="mb-8 shadow-ocean">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Argo has been described by New York Times science writer Justin Gillis as 
                  "one of the scientific triumphs of the age". The triumphs have been technological 
                  and scientific. The free access to Argo data means that there is wide usage – 
                  over 6000 scientific publications have referred to or used Argo data as have 
                  almost 500 PhD theses.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Argo has greatly reduced the uncertainty of global heat storage estimates and 
                  hence projections of sea level rise. The changes in salinity monitored by Argo 
                  also allow changes in global rainfall patterns to be studied.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-float transition-wave">
                <CardHeader>
                  <CardTitle className="text-ocean-deep">Research Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Scientific Publications</span>
                    <Badge variant="secondary">6,000+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">PhD Theses</span>
                    <Badge variant="secondary">500+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Data Access</span>
                    <Badge variant="secondary" className="text-green-600">Free</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-float transition-wave">
                <CardHeader>
                  <CardTitle className="text-ocean-deep">Key Discoveries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-ocean-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground text-sm">
                      Reduced uncertainty in sea level rise projections
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-ocean-accent rounded-full mt-2"></div>
                    <span className="text-muted-foreground text-sm">
                      Global heat storage monitoring
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-ocean-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground text-sm">
                      Global rainfall pattern analysis
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore Argo Data with AI
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Use FloatChat to interact with this incredible dataset through natural 
            language queries and discover ocean insights like never before.
          </p>
          <Link to="/dashboard">
            <Button variant="float" size="lg">
              Start Exploring Data
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
              © 2024 FloatChat. Supporting ARGO ocean research through AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;