import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Globe, Mic, Bell, HelpCircle, Info, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { languages, type Language } from "@/lib/i18n";

const Settings = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const { 
    locationPermission, 
    notificationPermission, 
    requestLocationPermission,
    requestNotificationPermission 
  } = usePermissions();

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) setSelectedLanguage(saved);
    
    const savedVoice = localStorage.getItem('voiceEnabled');
    if (savedVoice) setVoiceEnabled(savedVoice === 'true');
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    localStorage.setItem('language', lang);
    toast.success(`Language changed to ${languages[lang]}`);
  };

  const handleVoiceToggle = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    localStorage.setItem('voiceEnabled', String(enabled));
    toast.success(enabled ? "Voice input enabled" : "Voice input disabled");
  };

  const handleLocationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestLocationPermission();
      if (granted) {
        toast.success("Location permission granted");
      } else {
        toast.error("Location permission denied");
      }
    }
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        toast.success("Notification permission granted");
      } else {
        toast.error("Notification permission denied");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </header>

      {/* Settings Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Language Selection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Language</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(languages) as [Language, string][]).map(([code, name]) => (
                <Button
                  key={code}
                  variant={selectedLanguage === code ? "default" : "outline"}
                  className="justify-start text-sm"
                  onClick={() => handleLanguageChange(code)}
                >
                  {name}
                </Button>
              ))}
            </div>
          </Card>

          {/* Voice Input */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-primary" />
                <div>
                  <Label className="text-base font-semibold">Voice Input</Label>
                  <p className="text-sm text-muted-foreground">Enable voice-to-text</p>
                </div>
              </div>
              <Switch 
                checked={voiceEnabled}
                onCheckedChange={handleVoiceToggle} 
              />
            </div>
          </Card>

          {/* Location Permission */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <Label className="text-base font-semibold">Location Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Status: {locationPermission === 'granted' ? '✓ Granted' : locationPermission === 'denied' ? '✗ Denied' : 'Not requested'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={locationPermission === 'granted'}
                onCheckedChange={handleLocationToggle}
                disabled={locationPermission === 'denied'}
              />
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <Label className="text-base font-semibold">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Status: {notificationPermission === 'granted' ? '✓ Granted' : notificationPermission === 'denied' ? '✗ Denied' : 'Not requested'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={notificationPermission === 'granted'}
                onCheckedChange={handleNotificationToggle}
                disabled={notificationPermission === 'denied'}
              />
            </div>
          </Card>

          {/* Help & Tutorial */}
          <Card className="p-6">
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-0"
              onClick={() => toast.info("Tutorial will be available soon")}
            >
              <div className="flex items-start gap-4">
                <div className="bg-success/10 rounded-full p-3">
                  <HelpCircle className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1 text-left">
                  <Label className="text-base font-semibold">Help & Tutorial</Label>
                  <p className="text-sm text-muted-foreground">
                    Learn how to use the app
                  </p>
                </div>
              </div>
            </Button>
          </Card>

          {/* App Information */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-full p-3">
                <Info className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold mb-3 block">
                  App Information
                </Label>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-medium">Oct 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Build:</span>
                    <span className="font-medium">Production</span>
                  </div>
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
