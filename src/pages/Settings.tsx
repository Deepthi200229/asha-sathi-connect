import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Globe, Mic, Bell, HelpCircle, Info } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
            <p className="text-xs text-muted-foreground">Configure your preferences</p>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Language */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold">Language</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose your preferred language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {["English", "हिंदी", "मराठी", "ગુજરાતી"].map((lang) => (
                    <Button
                      key={lang}
                      variant={lang === "English" ? "default" : "outline"}
                      onClick={() =>
                        toast.success(`Language changed to ${lang}`)
                      }
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Voice Input */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 rounded-full p-3">
                  <Mic className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <Label className="text-base font-semibold">Voice Input</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable voice-to-text for forms
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-warning/10 rounded-full p-3">
                  <Bell className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <Label className="text-base font-semibold">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders for visits and tasks
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>

          {/* Help & Tutorial */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-success/10 rounded-full p-3">
                <HelpCircle className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold">Help & Tutorial</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to use ASHASathi
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info("Tutorial will be available soon")}
                >
                  Watch Tutorial Videos
                </Button>
              </div>
            </div>
          </Card>

          {/* App Info */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-full p-3">
                <Info className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold">App Information</Label>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>Version: 1.0.0</p>
                  <p>Last Updated: Oct 2025</p>
                  <p>Build: Production</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
