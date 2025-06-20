import { useState } from "react";
import {
  Droplets,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  AlertCircle,
  User,
  Building2,
  PhoneCall,
  Send,
  ChevronRight,
  Shield,
} from "lucide-react";

/* ───────────────────────── types ───────────────────────── */

type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type UrgencyLevel = "Normal" | "Urgent" | "Critical";
type InventoryStatus = "Adequate" | "Low" | "Critical";

interface BloodInventory {
  type: BloodType;
  units: number;
  status: InventoryStatus;
}

interface BloodBank {
  id: string;
  name: string;
  distance: string;
  availableTypes: BloodType[];
  phone: string;
}

/* ───────────────────────── mock data ───────────────────────── */

const bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inventory: BloodInventory[] = [
  { type: "A+", units: 142, status: "Adequate" },
  { type: "A-", units: 38, status: "Low" },
  { type: "B+", units: 95, status: "Adequate" },
  { type: "B-", units: 22, status: "Critical" },
  { type: "AB+", units: 67, status: "Adequate" },
  { type: "AB-", units: 15, status: "Critical" },
  { type: "O+", units: 180, status: "Adequate" },
  { type: "O-", units: 41, status: "Low" },
];

const bloodBanks: BloodBank[] = [
  { id: "BB-001", name: "Kenyatta National Hospital Blood Bank", distance: "2.3 km", availableTypes: ["A+", "B+", "O+", "AB+"], phone: "+254 20 2726300" },
  { id: "BB-002", name: "Nairobi Regional Blood Bank", distance: "5.1 km", availableTypes: ["A+", "A-", "B+", "B-", "O+", "O-"], phone: "+254 20 2714200" },
  { id: "BB-003", name: "Aga Khan Hospital Blood Centre", distance: "5.7 km", availableTypes: ["A+", "B+", "AB+", "AB-", "O+"], phone: "+254 20 3662000" },
  { id: "BB-004", name: "Mama Lucy Kibaki Blood Donation", distance: "8.2 km", availableTypes: ["O+", "O-", "A+", "B+"], phone: "+254 20 2718600" },
];

/* ───────────────────────── helpers ───────────────────────── */

function getStatusGlow(status: InventoryStatus) {
  switch (status) {
    case "Adequate":
      return "shadow-emerald-500/30 from-emerald-500 to-green-600";
    case "Low":
      return "shadow-amber-500/30 from-amber-500 to-yellow-600";
    case "Critical":
      return "shadow-red-500/30 from-red-500 to-rose-600 animate-pulse";
  }
}

function getStatusTextColor(status: InventoryStatus) {
  switch (status) {
    case "Adequate":
      return "text-emerald-400";
    case "Low":
      return "text-amber-400";
    case "Critical":
      return "text-red-400";
  }
}

function getUrgencyStyle(level: UrgencyLevel) {
  switch (level) {
    case "Normal":
      return {
        card: "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10",
        dot: "bg-emerald-400",
        selected: "ring-2 ring-emerald-500 bg-emerald-500/20 border-emerald-500/50",
      };
    case "Urgent":
      return {
        card: "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10",
        dot: "bg-amber-400",
        selected: "ring-2 ring-amber-500 bg-amber-500/20 border-amber-500/50",
      };
    case "Critical":
      return {
        card: "border-red-500/30 bg-red-500/5 hover:bg-red-500/10",
        dot: "bg-red-500 animate-pulse",
        selected: "ring-2 ring-red-500 bg-red-500/20 border-red-500/50",
      };
  }
}

/* ───────────────────────── component ───────────────────────── */

export default function Blood() {
  const [selectedType, setSelectedType] = useState<BloodType | null>(null);
  const [urgency, setUrgency] = useState<UrgencyLevel>("Normal");
  const [units, setUnits] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [hospital, setHospital] = useState("");
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const handleSubmit = () => {
    if (!selectedType || !hospital || !patientName || !contactPhone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Droplets className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold tracking-tight">Blood Bank Network</h1>
          </div>
          <p className="text-red-200 text-sm mt-1">
            Real-time blood inventory and request management
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Inventory Grid */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Droplets className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">Current Inventory</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {inventory.map((item) => (
              <div
                key={item.type}
                className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  selectedType === item.type ? "ring-2 ring-red-500 bg-red-500/5" : ""
                }`}
              >
                {/* Circular Indicator */}
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${getStatusGlow(
                    item.status
                  )} flex items-center justify-center mb-3 shadow-lg`}
                >
                  <span className="text-xl font-bold text-white">{item.type}</span>
                </div>
                <p className="text-2xl font-bold text-white">{item.units}</p>
                <p className={`text-xs font-medium ${getStatusTextColor(item.status)}`}>
                  {item.status === "Adequate" && <CheckCircle2 className="w-3 h-3 inline mr-0.5" />}
                  {item.status === "Low" && <AlertTriangle className="w-3 h-3 inline mr-0.5" />}
                  {item.status === "Critical" && <AlertCircle className="w-3 h-3 inline mr-0.5" />}
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Blood Bank Directory */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-semibold">Blood Bank Directory</h2>
          </div>
          <div className="space-y-3">
            {bloodBanks.map((bank) => (
              <div
                key={bank.id}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:bg-white/[0.07]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{bank.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs">
                        {bank.distance}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {bank.availableTypes.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${bank.phone}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Request Form */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6">
          {submitted ? (
            /* Success State */
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Blood Request Submitted</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-1">
                Your request for <strong className="text-red-400">{selectedType}</strong> blood ({units} units,{" "}
                <span className={getStatusTextColor(urgency as InventoryStatus)}>{urgency}</span> priority) has been sent to all
                nearby blood banks.
              </p>
              <p className="text-slate-500 text-xs">Reference: BREQ-2024-0892</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedType(null);
                  setUrgency("Normal");
                  setUnits(2);
                  setHospital("");
                  setPatientName("");
                  setDoctorName("");
                  setContactPhone("");
                }}
                className="mt-6 px-6 py-2 rounded-xl bg-white/5 text-slate-300 text-sm hover:bg-white/10 transition-colors"
              >
                New Request
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Send className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold">Request Blood</h2>
              </div>

              <div className="space-y-6">
                {/* Blood Type Selector */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Select Blood Type</label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {bloodTypes.map((bt) => {
                      const inv = inventory.find((i) => i.type === bt)!;
                      return (
                        <button
                          key={bt}
                          onClick={() => setSelectedType(bt)}
                          className={`w-full aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                            selectedType === bt
                              ? "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400"
                              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {bt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Urgency Selector */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["Normal", "Urgent", "Critical"] as UrgencyLevel[]).map((level) => {
                      const style = getUrgencyStyle(level);
                      const isSelected = urgency === level;
                      return (
                        <button
                          key={level}
                          onClick={() => setUrgency(level)}
                          className={`rounded-xl border p-4 text-center transition-all duration-200 ${
                            isSelected ? style.selected : style.card
                          }`}
                        >
                          <span className={`inline-block w-3 h-3 rounded-full mb-2 ${style.dot}`} />
                          <p className="text-sm font-medium text-white">{level}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Units Input */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Units Required</label>
                  <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5">
                    <button
                      onClick={() => setUnits((u) => Math.max(1, u - 1))}
                      className="px-4 py-2.5 text-slate-400 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 text-lg font-bold text-white min-w-[3rem] text-center">
                      {units}
                    </span>
                    <button
                      onClick={() => setUnits((u) => Math.min(20, u + 1))}
                      className="px-4 py-2.5 text-slate-400 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-3 text-xs text-slate-500">units (max 20)</span>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Hospital</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        placeholder="Select hospital..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Patient Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <User className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Full name..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Doctor Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <Shield className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        placeholder="Doctor name (optional)..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Contact Phone</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <PhoneCall className="w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+254 7XX XXX XXX"
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!selectedType || !hospital || !patientName || !contactPhone}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedType && hospital && patientName && contactPhone
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
                      : "bg-white/5 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  Request Blood
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
