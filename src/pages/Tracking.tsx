import { useState, useEffect } from "react";
import {
  Phone,
  Shield,
  Cross,
  Ambulance,
  Clock,
  CheckCircle2,
  Circle,
  MapPin,
  Star,
  X,
  Navigation,
  Activity,
} from "lucide-react";

/* ───────────────────────── types ───────────────────────── */

type TimelineStep = {
  label: string;
  status: "completed" | "active" | "pending";
  time?: string;
};

/* ───────────────────────── mock data ───────────────────────── */

const timelineSteps: TimelineStep[] = [
  { label: "Emergency Reported", status: "completed", time: "14:02" },
  { label: "CFR Dispatched", status: "completed", time: "14:03" },
  { label: "Ambulance En Route", status: "completed", time: "14:05" },
  { label: "CFR Arrived", status: "completed", time: "14:09" },
  { label: "Patient Stabilized", status: "active", time: "14:12" },
  { label: "Ambulance Arrived", status: "pending", time: "14:16" },
  { label: "Hospital Transfer", status: "pending", time: "--:--" },
];

/* ───────────────────────── component ───────────────────────── */

export default function Tracking() {
  const [pulseActive, setPulseActive] = useState(true);
  const [etaSeconds, setEtaSeconds] = useState(480); // 8 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((p) => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(etaSeconds / 60);
  const progress = ((480 - etaSeconds) / 480) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Activity className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold tracking-tight">Live Tracking</h1>
            <span className="relative flex h-3 w-3 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Real-time ambulance and CFR location monitoring
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Emergency ID Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
            <span className="text-slate-400 text-sm">Emergency ID</span>
            <span className="text-xl font-bold font-mono text-red-400">#EM-4521</span>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium animate-pulse">
              LIVE
            </span>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-200 to-slate-300 h-80">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Map Label */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur text-slate-300 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live GPS Tracking
          </div>

          {/* Ambulance Marker */}
          <div className="absolute top-[45%] left-[35%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="absolute -inset-4 rounded-full bg-red-500/30 animate-ping" />
              <span className="absolute -inset-2 rounded-full bg-red-500/50 animate-pulse" />
              <div className="relative p-3 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/40">
                <Ambulance className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Hospital Marker */}
          <div className="absolute top-[30%] right-[25%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="absolute -inset-3 rounded-full bg-sky-500/30 animate-pulse" />
              <div className="relative p-3 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/40">
                <Cross className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Patient/CFR Marker */}
          <div className="absolute top-[55%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative p-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/40">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Animated Route Line (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path
              d="M 135 200 Q 200 150 280 180 T 450 120"
              stroke="url(#routeGradient)"
              strokeWidth="3"
              strokeDasharray="8 4"
              fill="none"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="24"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          {/* Map View overlay button */}
          <div className="absolute bottom-4 right-4">
            <button className="px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur text-white text-sm font-medium hover:bg-slate-900 transition-colors">
              Full Map View
            </button>
          </div>
        </div>

        {/* Status Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ambulance Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <Ambulance className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ambulance</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Driver</span>
                <span className="text-sm font-medium">John Mwangi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Plate</span>
                <span className="text-sm font-mono text-slate-300">KBY 234Z</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Phone</span>
                <span className="text-sm font-mono text-slate-300">+254 712 345 678</span>
              </div>
            </div>
          </div>

          {/* ETA Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-center text-center">
            <Clock className="w-6 h-6 text-amber-400 mb-2" />
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {minutes} min
            </p>
            <p className="text-slate-400 text-sm mt-1">estimated arrival</p>
            <div className="w-full mt-4">
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{Math.round(progress)}% en route</p>
            </div>
          </div>

          {/* CFR Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">CFR Responder</h3>
                <span className="text-slate-400 text-xs">On Scene</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Name</span>
                <span className="text-sm font-medium">Sarah Odhiambo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Distance</span>
                <span className="text-sm font-medium text-emerald-400">0.3 km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Rating</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Response Timeline</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10" />

            <div className="space-y-6">
              {timelineSteps.map((step, i) => (
                <div key={step.label} className="relative flex items-start gap-5">
                  {/* Dot */}
                  <div className="relative z-10 mt-0.5">
                    {step.status === "completed" && (
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                    )}
                    {step.status === "active" && (
                      <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/30">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                        </span>
                      </div>
                    )}
                    {step.status === "pending" && (
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 border-dashed flex items-center justify-center">
                        <Circle className="w-5 h-5 text-slate-600" />
                      </div>
                    )}
                  </div>

                  {/* Connector line segment */}
                  {i < timelineSteps.length - 1 && (
                    <div
                      className={`absolute left-[19px] top-10 w-0.5 h-6 ${
                        step.status === "completed"
                          ? "bg-emerald-500/40"
                          : step.status === "active"
                          ? "bg-gradient-to-b from-red-500/40 to-white/10"
                          : "bg-white/5"
                      }`}
                    />
                  )}

                  {/* Content */}
                  <div className="pt-1.5">
                    <p
                      className={`text-sm font-medium ${
                        step.status === "active"
                          ? "text-white"
                          : step.status === "completed"
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        step.status === "pending" ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {step.status === "completed" && `Completed at ${step.time}`}
                      {step.status === "active" && `In progress - ${step.time}`}
                      {step.status === "pending" && "Waiting..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center pb-8">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5">
            <Phone className="w-4 h-4" />
            Call Driver
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-0.5">
            <Phone className="w-4 h-4" />
            Call Hospital
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-red-500/30 text-red-400 font-medium hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-0.5">
            <X className="w-4 h-4" />
            Cancel Emergency
          </button>
        </div>
      </main>
    </div>
  );
}
