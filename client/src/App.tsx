import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Devices from "@/pages/Devices";
import Learn from "@/pages/Learn";
import Marketplace from "@/pages/Marketplace";
import Profile from "@/pages/Profile";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useAppContext } from "./contexts/AppContext";
import { useEffect } from "react";

// Main App component - includes routing
function App() {
  const [location] = useLocation();
  const { setCurrentPage } = useAppContext();
  
  useEffect(() => {
    const path = location.split('/')[1];
    setCurrentPage(path || 'home');
  }, [location, setCurrentPage]);
  
  return (
    <>
      <Toaster />
      <div className="flex flex-col min-h-screen pb-16">
        <Header />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/devices" component={Devices} />
          <Route path="/learn" component={Learn} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
        <BottomNavigation />
      </div>
    </>
  );
}

export default App;
