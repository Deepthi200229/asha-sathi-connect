import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BarChart3, FileText, TrendingUp, Users } from "lucide-react";

const Reports = () => {
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
            <h1 className="text-xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-xs text-muted-foreground">PHC Dashboard</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-full p-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-success/10 rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">18</h3>
                <p className="text-sm text-muted-foreground">Completed Visits</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning/10 rounded-full p-3">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">5</h3>
                <p className="text-sm text-muted-foreground">Pending Follow-ups</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/10 rounded-full p-3">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">92%</h3>
                <p className="text-sm text-muted-foreground">Coverage Rate</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
