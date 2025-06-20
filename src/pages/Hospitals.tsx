import { useState } from "react";
import {
  Search,
  X,
  MapPin,
  Phone,
  Navigation,
  Hospital,
  ChevronDown,
  ChevronUp,
  Clock,
  Stethoscope,
  BedDouble,
  AlertCircle,
} from "lucide-react";

/* ───────────────────────── types ───────────────────────── */

type Specialty = "All" | "General" | "Cardiac" | "Maternity" | "Pediatric" | "Orthopedic" | "Neuro";

interface HospitalData {
  id: string;
  name: string;
  location: string;
  distance: string;
  specialty: Specialty;
  bedsTotal: number;
  bedsAvailable: number;
  hasER: boolean;
  phone: string;
  specialties: string[];
  visitingHours: string;
  county: string;
  borderColor: string;
}

/* ───────────────────────── mock data ───────────────────────── */

const specialties: Specialty[] = ["All", "General", "Cardiac", "Maternity", "Pediatric", "Orthopedic", "Neuro"];

const hospitals: HospitalData[] = [
  {
    id: "H-001",
    name: "Kenyatta National Hospital",
    location: "Hospital Rd, Nairobi",
    distance: "2.3 km",
    specialty: "General",
    bedsTotal: 1800,
    bedsAvailable: 342,
    hasER: true,
    phone: "+254 20 2726300",
    specialties: ["General Medicine", "Surgery", "ICU", "Radiology", "Laboratory"],
    visitingHours: "8:00 AM - 8:00 PM",
    county: "Nairobi",
    borderColor: "from-blue-500 to-sky-500",
  },
  {
    id: "H-002",
    name: "Nairobi West Hospital",
    location: "Gandhi Ave, Nairobi West",
    distance: "4.1 km",
    specialty: "Cardiac",
    bedsTotal: 120,
    bedsAvailable: 18,
    hasER: true,
    phone: "+254 20 6002300",
    specialties: ["Cardiology", "Cardiac Surgery", "ICU", "Emergency"],
    visitingHours: "24 Hours",
    county: "Nairobi",
    borderColor: "from-red-500 to-rose-500",
  },
  {
    id: "H-003",
    name: "Aga Khan University Hospital",
    location: "3rd Parklands Ave, Nairobi",
    distance: "5.7 km",
    specialty: "General",
    bedsTotal: 300,
    bedsAvailable: 87,
    hasER: true,
    phone: "+254 20 3662000",
    specialties: ["General Medicine", "Oncology", "Neurosurgery", "Pediatrics"],
    visitingHours: "7:00 AM - 9:00 PM",
    county: "Nairobi",
    borderColor: "from-emerald-500 to-green-500",
  },
  {
    id: "H-004",
    name: "Mama Lucy Kibaki Hospital",
    location: "Kangundo Rd, Nairobi",
    distance: "8.2 km",
    specialty: "Maternity",
    bedsTotal: 220,
    bedsAvailable: 45,
    hasER: false,
    phone: "+254 20 2718600",
    specialties: ["Maternity", "Gynecology", "Pediatrics", "General Medicine"],
    visitingHours: "8:00 AM - 6:00 PM",
    county: "Nairobi",
    borderColor: "from-pink-500 to-fuchsia-500",
  },
  {
    id: "H-005",
    name: "Gertrude's Children's Hospital",
    location: "Muthaiga, Nairobi",
    distance: "6.5 km",
    specialty: "Pediatric",
    bedsTotal: 100,
    bedsAvailable: 62,
    hasER: true,
    phone: "+254 20 7206000",
    specialties: ["Pediatrics", "Pediatric Surgery", "Neonatal ICU"],
    visitingHours: "24 Hours",
    county: "Nairobi",
    borderColor: "from-amber-500 to-yellow-500",
  },
  {
    id: "H-006",
    name: "Orthopaedics & Spine Clinic",
    location: "Hurlingham, Nairobi",
    distance: "3.8 km",
    specialty: "Orthopedic",
    bedsTotal: 50,
    bedsAvailable: 8,
    hasER: false,
    phone: "+254 20 2712000",
    specialties: ["Orthopedics", "Spine Surgery", "Sports Medicine", "Physiotherapy"],
    visitingHours: "9:00 AM - 5:00 PM",
    county: "Nairobi",
    borderColor: "from-violet-500 to-purple-500",
  },
];

/* ───────────────────────── helpers ───────────────────────── */

function BedCapacityBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  const color = pct > 50 ? "from-emerald-500 to-green-500" : pct > 20 ? "from-amber-500 to-yellow-500" : "from-red-500 to-rose-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Bed Capacity</span>
        <span className={pct > 50 ? "text-emerald-400" : pct > 20 ? "text-amber-400" : "text-red-400"}>
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ───────────────────────── component ───────────────────────── */

export default function Hospitals() {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = hospitals.filter((h) => {
    const matchSearch =
      search === "" ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = activeSpecialty === "All" || h.specialty === activeSpecialty;
    return matchSearch && matchSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Hospital className="w-8 h-8 text-sky-400" />
            <h1 className="text-3xl font-bold tracking-tight">Hospital Finder</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Locate nearby hospitals and check bed availability
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Map Placeholder */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-700 to-slate-800 h-48 flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute flex gap-2">
            {hospitals.slice(0, 3).map((h, i) => (
              <div
                key={h.id}
                className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur text-xs text-slate-300 border border-white/10"
              >
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {h.name.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            ))}
          </div>
          <button className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors shadow-lg shadow-sky-500/25">
            Map View
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-3">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospitals by name or location..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSpecialty === s
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((h) => (
            <div
              key={h.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Top gradient border */}
              <div className={`h-1 bg-gradient-to-r ${h.borderColor}`} />

              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${h.borderColor} bg-opacity-20`}>
                      <Hospital className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{h.name}</h3>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {h.location}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-medium">
                    {h.distance}
                  </span>
                </div>

                {/* Bed Capacity */}
                <BedCapacityBar current={h.bedsAvailable} total={h.bedsTotal} />

                {/* ER Badge + Phone */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {h.hasER && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        ER Available
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-xs border border-white/10">
                      {h.specialty}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{h.id}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={`tel:${h.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-sky-500/30 text-sky-400 text-xs font-medium hover:bg-sky-500/10 transition-all">
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === h.id ? null : h.id)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-xl border border-white/10 text-slate-400 text-xs font-medium hover:bg-white/5 transition-all"
                  >
                    {expandedId === h.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expandable Details */}
                {expandedId === h.id && (
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div>
                      <h4 className="text-xs font-medium text-slate-300 mb-2 inline-flex items-center gap-1">
                        <Stethoscope className="w-3 h-3" />
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {h.specialties.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-xs border border-white/5"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        Visiting Hours
                      </span>
                      <span className="text-slate-300">{h.visitingHours}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <BedDouble className="w-3 h-3" />
                        Total Beds
                      </span>
                      <span className="text-slate-300">{h.bedsTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Phone className="w-3 h-3" />
                        Contact
                      </span>
                      <span className="text-slate-300 font-mono">{h.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Hospital className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No hospitals found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
