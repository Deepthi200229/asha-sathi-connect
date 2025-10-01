import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UserCircle, Lock, Users, UserCog } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"asha" | "phc" | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    localStorage.setItem("userRole", role || "asha");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-4">
              <Users className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">ASHASathi</h1>
          <p className="text-muted-foreground">Digital Health Record Companion</p>
        </div>

        {!role ? (
          <div className="space-y-4">
            <p className="text-center text-sm font-medium text-muted-foreground">
              Select Your Role
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setRole("asha")}
                variant="outline"
                className="h-32 flex flex-col gap-3 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <UserCircle className="w-12 h-12" />
                <span className="text-lg font-semibold">ASHA Worker</span>
              </Button>
              <Button
                onClick={() => setRole("phc")}
                variant="outline"
                className="h-32 flex flex-col gap-3 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <UserCog className="w-12 h-12" />
                <span className="text-lg font-semibold">PHC Staff</span>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number / Employee ID</label>
              <Input
                type="text"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PIN</label>
              <Input
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="h-12 text-base"
                maxLength={4}
                required
              />
            </div>
            <div className="space-y-3">
              <Button type="submit" className="w-full h-12 text-base font-semibold">
                <Lock className="w-5 h-5 mr-2" />
                Login as {role === "asha" ? "ASHA Worker" : "PHC Staff"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setRole(null)}
                className="w-full"
              >
                Change Role
              </Button>
            </div>
          </form>
        )}

        <div className="pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">
            <span className="inline-block w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
            Offline Mode Available
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
