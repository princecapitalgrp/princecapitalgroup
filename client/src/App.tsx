import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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
import MacroMuseum from "./pages/MacroMuseum";
import RegimeGallery from "./pages/RegimeGallery";
import MapWall from "./pages/MapWall";
import RegionalChamber from "./pages/RegionalChamber";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/strategy" component={Strategy} />
      <Route path="/risk" component={Risk} />
      <Route path="/academy" component={Academy} />
      <Route path="/macro-museum" component={MacroMuseum} />
      <Route path="/macro-museum/regime-gallery" component={RegimeGallery} />
      <Route path="/macro-museum/map-wall" component={MapWall} />
      <Route path="/macro-museum/regional-chamber" component={RegionalChamber} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.22 0.04 243)" }}>
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
