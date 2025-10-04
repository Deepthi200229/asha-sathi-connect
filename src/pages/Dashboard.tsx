import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  UserPlus,
  FileText,
  Bell,
  RefreshCw,
  BarChart3,
  Settings,
  Wifi,
  WifiOff,
  Menu,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isOnline, toggleOnline } = useOnlineStatus();
  const userRole = localStorage.getItem("userRole") || "asha";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const dashboardItems = [
    {
      icon: UserPlus,
      label: "Register Patient",
      description: "Add new patient",
      color: "bg-primary",
      route: "/register-patient",
    },
    {
      icon: FileText,
      label: "Patient Records",
      description: "View all records",
      color: "bg-accent",
      route: "/patients",
    },
    {
      icon: Bell,
      label: "Reminders",
      description: "Upcoming visits",
      color: "bg-warning",
      route: "/reminders",
    },
    {
      icon: RefreshCw,
      label: "Sync Data",
      description: "Upload records",
      color: "bg-success",
      route: "/sync",
    },
  ];

  if (userRole === "phc") {
    dashboardItems.push({
      icon: BarChart3,
      label: "Reports",
      description: "Analytics & metrics",
      color: "bg-destructive",
      route: "/reports",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">ASHASathi</h1>
              <p className="text-xs text-muted-foreground">
                {userRole === "asha" ? "ASHA Worker" : "PHC Staff"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                toggleOnline();
                toast.info(isOnline ? "Switched to offline mode" : "Switched to online mode");
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium cursor-pointer hover:bg-secondary/80 transition-colors"
            >
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-success" />
                  <span className="text-success-foreground">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Offline</span>
                </>
              )}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Choose an action to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {dashboardItems.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              onClick={() => navigate(item.route)}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`${item.color} rounded-2xl p-4 text-white`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">24</p>
            <p className="text-xs text-muted-foreground mt-1">Patients Registered</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-warning">5</p>
            <p className="text-xs text-muted-foreground mt-1">Pending Reminders</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-success">18</p>
            <p className="text-xs text-muted-foreground mt-1">Completed Visits</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-accent">2h ago</p>
            <p className="text-xs text-muted-foreground mt-1">Last Synced</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
