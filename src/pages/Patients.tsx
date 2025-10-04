import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, UserCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase";
import { offlineStorage } from "@/lib/offlineStorage";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

interface Patient {
  id: string;
  name: string;
  age?: number;
  gender: string;
  village?: string;
  address?: string;
  lastVisit?: string;
  last_visit?: string;
  status: string;
}

const Patients = () => {
  const navigate = useNavigate();
  const { isOnline } = useOnlineStatus();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, [isOnline]);

  const loadPatients = async () => {
    setLoading(true);
    try {
      if (isOnline) {
        // Load from Supabase
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedData: Patient[] = (data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          age: p.dob ? Math.floor((new Date().getTime() - new Date(p.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined,
          gender: p.gender,
          village: p.address?.split(',')[0],
          address: p.address,
          lastVisit: p.last_visit,
          status: p.status || 'healthy',
        }));

        setPatients(formattedData);
      } else {
        // Load from offline storage
        const offlineData = offlineStorage.getPatients();
        const formattedData: Patient[] = offlineData.map((p: any) => ({
          id: p.id || crypto.randomUUID(),
          name: p.name,
          age: p.dob ? Math.floor((new Date().getTime() - new Date(p.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined,
          gender: p.gender,
          village: p.address?.split(',')[0],
          address: p.address,
          lastVisit: new Date().toISOString().split('T')[0],
          status: 'healthy',
        }));

        setPatients(formattedData);
      }
    } catch (error) {
      console.error('Error loading patients:', error);
      // Fallback to offline data
      const offlineData = offlineStorage.getPatients();
      const formattedData: Patient[] = offlineData.map((p: any) => ({
        id: p.id || crypto.randomUUID(),
        name: p.name,
        age: p.dob ? Math.floor((new Date().getTime() - new Date(p.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined,
        gender: p.gender,
        village: p.address?.split(',')[0],
        address: p.address,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'healthy',
      }));
      setPatients(formattedData);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) =>
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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading patients...</p>
          </div>
        ) : (
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
                      {patient.age ? `${patient.age} years • ` : ''}{patient.gender}
                    </p>
                    {patient.village && <p>Village: {patient.village}</p>}
                    {patient.lastVisit && <p>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>}
                  </div>
                </div>
              </div>
            </Card>
            ))}

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No patients found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Patients;
