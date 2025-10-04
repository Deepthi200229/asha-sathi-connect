interface PatientData {
  id?: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  contact: string;
  familyId: string;
  synced: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'offline_patients';

export const offlineStorage = {
  savePatient: (patient: PatientData): void => {
    const patients = offlineStorage.getPatients();
    const newPatient = {
      ...patient,
      id: patient.id || crypto.randomUUID(),
      synced: false,
      createdAt: new Date().toISOString(),
    };
    patients.push(newPatient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  },

  getPatients: (): PatientData[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getUnsyncedPatients: (): PatientData[] => {
    return offlineStorage.getPatients().filter(p => !p.synced);
  },

  markAsSynced: (patientId: string): void => {
    const patients = offlineStorage.getPatients();
    const updated = patients.map(p => 
      p.id === patientId ? { ...p, synced: true } : p
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  clearSyncedPatients: (): void => {
    const patients = offlineStorage.getPatients();
    const unsynced = patients.filter(p => !p.synced);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unsynced));
  },
};
