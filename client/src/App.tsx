import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Strategy from "./pages/Strategy";
import Risk from "./pages/Risk";
import Academy from "./pages/Academy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Waitlist from "./pages/Waitlist";
import MacroMuseum from "./pages/MacroMuseum";
import RegimeGallery from "./pages/RegimeGallery";
import MapWall from "./pages/MapWall";
import RegionalChamber from "./pages/RegionalChamber";
import Research from "./pages/Research";

function Router() {
  const [location] = useLocation();
  const isStandalonePage = location === "/academy" || location === "/research";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.97 0.002 286)" }}>
      {!isStandalonePage && <Navigation />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/strategy" component={Strategy} />
          <Route path="/risk" component={Risk} />
          <Route path="/academy" component={Academy} />
          <Route path="/research" component={Research} />
          <Route path="/waitlist" component={Waitlist} />
          <Route path="/macro-museum" component={MacroMuseum} />
          <Route path="/macro-museum/regime-gallery" component={RegimeGallery} />
          <Route path="/macro-museum/map-wall" component={MapWall} />
          <Route path="/macro-museum/regional-chamber" component={RegionalChamber} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isStandalonePage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
