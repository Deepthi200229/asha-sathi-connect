import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mic, Camera, Save, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase";
import { offlineStorage } from "@/lib/offlineStorage";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

const RegisterPatient = () => {
  const navigate = useNavigate();
  const { isOnline } = useOnlineStatus();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    contact: "",
    familyId: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isOnline) {
        // Save to Supabase when online
        const { error } = await supabase
          .from('patients')
          .insert([{
            name: formData.name,
            dob: formData.dob,
            gender: formData.gender,
            address: formData.address,
            contact: formData.contact,
            family_id: formData.familyId,
            status: 'healthy',
            last_visit: new Date().toISOString().split('T')[0],
          }]);

        if (error) throw error;

        toast.success("Patient registered successfully!", {
          description: "Data saved to database",
        });
      } else {
        // Save offline when not online
        offlineStorage.savePatient({
          ...formData,
          synced: false,
          createdAt: new Date().toISOString(),
        });
        toast.success("Patient registered offline!", {
          description: "Data will sync when online",
        });
      }

      navigate("/patients");
    } catch (error) {
      console.error('Error saving patient:', error);
      // Fallback to offline storage
      offlineStorage.savePatient({
        ...formData,
        synced: false,
        createdAt: new Date().toISOString(),
      });
      toast.error("Couldn't save online, saved offline", {
        description: "Data will sync when connection is restored",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleVoiceInput = (field: string) => {
    toast.info("Voice input feature", {
      description: "This will enable voice-to-text input",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Register New Patient</h1>
            <p className="text-xs text-muted-foreground">Fill in patient details</p>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-6">
        <Card className="max-w-2xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Patient Name *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className="h-12 text-base"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0"
                  onClick={() => handleVoiceInput("name")}
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-base font-semibold">
                Date of Birth *
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Gender *</Label>
              <div className="grid grid-cols-3 gap-3">
                {["Male", "Female", "Other"].map((gender) => (
                  <Button
                    key={gender}
                    type="button"
                    variant={formData.gender === gender ? "default" : "outline"}
                    className="h-12"
                    onClick={() => handleChange("gender", gender)}
                  >
                    {gender}
                  </Button>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-base font-semibold">
                Address *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Village, District"
                  className="h-12 text-base"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0"
                  onClick={() => toast.info("Geo-location captured")}
                >
                  <MapPin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-base font-semibold">
                Contact Number
              </Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="10-digit mobile number"
                className="h-12 text-base"
                maxLength={10}
              />
            </div>

            {/* Family ID */}
            <div className="space-y-2">
              <Label htmlFor="familyId" className="text-base font-semibold">
                Family ID
              </Label>
              <Input
                id="familyId"
                value={formData.familyId}
                onChange={(e) => handleChange("familyId", e.target.value)}
                placeholder="Enter family identifier"
                className="h-12 text-base"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Patient Photo (Optional)</Label>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => toast.info("Camera feature will be enabled")}
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </Button>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-semibold"
              disabled={saving}
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Saving...' : 'Save Patient'}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default RegisterPatient;
