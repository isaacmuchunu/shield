import { useState } from "react";
import {
  AlertTriangle,
  Users,
  Hospital,
  Droplets,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";

/* ───────────────────────── types ───────────────────────── */

interface KPICard {
  title: string;
  value: number;
  trend: number;
  trendUp: boolean;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
}

interface Emergency {
  id: string;
  type: string;
  location: string;
  time: string;
  status: "Resolved" | "Dispatched" | "Critical";
  severity: "Low" | "Moderate" | "High" | "Critical";
}

/* ───────────────────────── mock data ───────────────────────── */

const kpis: KPICard[] = [
  {
    title: "Active Emergencies",
    value: 12,
    trend: 8.2,
    trendUp: true,
    icon: <AlertTriangle className="w-6 h-6" />,
    gradient: "from-red-500 to-rose-600",
    iconBg: "bg-red-500/20",
  },
  {
    title: "CFR Responders",
    value: 89,
    trend: 12.5,
    trendUp: true,
    icon: <Users className="w-6 h-6" />,
    gradient: "from-emerald-500 to-green-600",
    iconBg: "bg-emerald-500/20",
  },
  {
    title: "Available Hospitals",
    value: 34,
    trend: 2.1,
    trendUp: false,
    icon: <Hospital className="w-6 h-6" />,
    gradient: "from-sky-500 to-blue-600",
    iconBg: "bg-sky-500/20",
  },
  {
    title: "Blood Units",
    value: 256,
    trend: 5.4,
    trendUp: true,
    icon: <Droplets className="w-6 h-6" />,
    gradient: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-500/20",
  },
];

const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Meru"];

const weeklyData = [
  { day: "Mon", emergencies: 18, resolved: 14 },
  { day: "Tue", emergencies: 24, resolved: 20 },
  { day: "Wed", emergencies: 12, resolved: 10 },
  { day: "Thu", emergencies: 28, resolved: 24 },
  { day: "Fri", emergencies: 32, resolved: 28 },
  { day: "Sat", emergencies: 15, resolved: 12 },
  { day: "Sun", emergencies: 8, resolved: 7 },
];

const emergencies: Emergency[] = [
  { id: "EM-4521", type: "Road Accident", location: "Mombasa Rd, Nairobi", time: "2 min ago", status: "Critical", severity: "Critical" },
  { id: "EM-4520", type: "Cardiac Arrest", location: "Westlands, Nairobi", time: "8 min ago", status: "Dispatched", severity: "High" },
  { id: "EM-4519", type: "Burn Injury", location: "Kisumu CBD", time: "15 min ago", status: "Dispatched", severity: "Moderate" },
  { id: "EM-4518", type: "Snake Bite", location: "Eldoret East", time: "32 min ago", status: "Resolved", severity: "High" },
  { id: "EM-4517", type: "Maternal Emergency", location: "Mombasa Island", time: "45 min ago", status: "Resolved", severity: "Moderate" },
  { id: "EM-4516", type: "Fall Injury", location: "Nakuru Town", time: "1 hr ago", status: "Resolved", severity: "Low" },
  { id: "EM-4515", type: "Poisoning", location: "Meru Central", time: "1.5 hr ago", status: "Resolved", severity: "High" },
];

/* ───────────────────────── helpers ───────────────────────── */

function StatusBadge({ status }: { status: Emergency["status"] }) {
  const styles = {
    Resolved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Dispatched: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Critical: "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status === "Resolved" && <Activity className="w-3 h-3 mr-1" />}
      {status === "Dispatched" && <Clock className="w-3 h-3 mr-1" />}
      {status === "Critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
      {status}
    </span>
  );
}

function SeverityDot({ severity }: { severity: Emergency["severity"] }) {
  const colors = {
    Low: "bg-emerald-400",
    Moderate: "bg-amber-400",
    High: "bg-orange-500",
    Critical: "bg-red-500 animate-pulse",
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
      <span className={`w-2 h-2 rounded-full ${colors[severity]}`} />
      {severity}
    </span>
  );
}

/* ───────────────────────── component ───────────────────────── */

export default function Dashboard() {
  const [activeCounty, setActiveCounty] = useState("Nairobi");

  const maxEmergencies = Math.max(...weeklyData.map((d) => d.emergencies));

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold tracking-tight">Operations Dashboard</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Real-time emergency response overview across all counties
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi.iconBg} text-white`}>
                  {kpi.icon}
                </div>
                <div
                  className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                    kpi.trendUp ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {kpi.trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {kpi.trend}%
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{kpi.title}</h3>
              <p className={`text-3xl font-bold bg-gradient-to-r ${kpi.gradient} bg-clip-text text-transparent mt-1`}>
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Weekly Overview</h2>
              <p className="text-slate-400 text-sm">Emergency calls vs resolved cases</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-500" />
                Emergencies
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                Resolved
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-8 text-right font-medium">{d.day}</span>
                <div className="flex-1 flex gap-2 items-end h-8">
                  <div
                    className="rounded-md bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-500 hover:from-red-400 hover:to-rose-400"
                    style={{ width: `${(d.emergencies / maxEmergencies) * 100}%`, height: "100%" }}
                    title={`${d.emergencies} emergencies`}
                  />
                  <div
                    className="rounded-md bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500 hover:from-emerald-400 hover:to-green-400"
                    style={{ width: `${(d.resolved / maxEmergencies) * 80}%`, height: "75%" }}
                    title={`${d.resolved} resolved`}
                  />
                </div>
                <div className="flex gap-3 text-xs text-slate-500 w-20 justify-end">
                  <span className="text-red-400">{d.emergencies}</span>
                  <span>/</span>
                  <span className="text-emerald-400">{d.resolved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* County Tabs */}
        <div className="flex flex-wrap gap-2">
          {counties.map((county) => (
            <button
              key={county}
              onClick={() => setActiveCounty(county)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCounty === county
                  ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {county}
            </button>
          ))}
        </div>

        {/* Recent Emergencies Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Recent Emergencies</h2>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                {activeCounty}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-white/5">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {emergencies.map((em) => (
                  <tr
                    key={em.id}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-3.5 text-sm font-mono text-red-400 group-hover:text-red-300">
                      {em.id}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-white">{em.type}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {em.location}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-400">{em.time}</td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={em.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      <SeverityDot severity={em.severity} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex justify-end">
            <button className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
              View All Emergencies
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
