import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, UserCircle } from "lucide-react";

// Mock data
const mockPatients = [
  {
    id: "1",
    name: "Ramesh Kumar",
    age: 35,
    gender: "Male",
    village: "Dharampur",
    lastVisit: "2025-09-25",
    status: "healthy",
  },
  {
    id: "2",
    name: "Meera Devi",
    age: 28,
    gender: "Female",
    village: "Ramgarh",
    lastVisit: "2025-09-28",
    status: "follow-up",
  },
  {
    id: "3",
    name: "Suresh Yadav",
    age: 42,
    gender: "Male",
    village: "Dharampur",
    lastVisit: "2025-09-20",
    status: "overdue",
  },
  {
    id: "4",
    name: "Geeta Kumari",
    age: 25,
    gender: "Female",
    village: "Sitapur",
    lastVisit: "2025-09-30",
    status: "healthy",
  },
];

const Patients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-success text-success-foreground";
      case "follow-up":
        return "bg-warning text-warning-foreground";
      case "overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Patient Records</h1>
            <p className="text-xs text-muted-foreground">
              {filteredPatients.length} patients found
            </p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* Patient List */}
      <main className="container mx-auto px-4 pb-6">
        <div className="space-y-3 max-w-2xl mx-auto">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/patient/${patient.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <UserCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {patient.name}
                    </h3>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      {patient.age} years • {patient.gender}
                    </p>
                    <p>Village: {patient.village}</p>
                    <p>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Patients;
