import { useState } from "react";
import {
  Shield,
  Users,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Award,
  CheckCircle2,
  Circle,
  Star,
  Trophy,
  Medal,
  Lock,
  ChevronRight,
  Clock,
  Calendar,
  BookOpen,
  Heart,
  Moon,
  Sun,
  Zap,
  Target,
  BadgeCheck,
  GraduationCap,
  HandHeart,
} from "lucide-react";

/* ───────────────────────── types ───────────────────────── */

type TrainingLevel = "Basic First Aid" | "Advanced CPR" | "Emergency Response";
type AvailabilitySlot = "Weekdays" | "Weekends" | "Evenings" | "24/7";

/* ───────────────────────── mock data ───────────────────────── */

const leaderboardTop = [
  { name: "James Ochieng", county: "Nairobi", responses: 342, badge: "gold" },
  { name: "Grace Wanjiku", county: "Kiambu", responses: 287, badge: "silver" },
  { name: "Peter Kiptoo", county: "Uasin Gishu", responses: 256, badge: "bronze" },
];

const leaderboardRest = [
  { rank: 4, name: "Amina Hassan", county: "Mombasa", badges: 8, responses: 198 },
  { rank: 5, name: "John Mutua", county: "Machakos", badges: 7, responses: 176 },
  { rank: 6, name: "Faith Njeri", county: "Nakuru", badges: 7, responses: 165 },
  { rank: 7, name: "Brian Odhiambo", county: "Kisumu", badges: 6, responses: 154 },
  { rank: 8, name: "Catherine Muthoni", county: "Nyeri", badges: 6, responses: 142 },
];

const trainingModules = [
  { title: "Basic First Aid", description: "Wound care, bleeding control, and patient assessment fundamentals.", progress: 100 },
  { title: "Advanced CPR", description: "Cardiopulmonary resuscitation techniques for adults and infants.", progress: 75 },
  { title: "Emergency Triage", description: "Patient prioritization during mass casualty incidents.", progress: 45 },
  { title: "Trauma Response", description: "Handling fractures, spinal injuries, and shock management.", progress: 20 },
];

const badges = [
  { name: "Life Saver", icon: <Heart className="w-6 h-6" />, unlocked: true, color: "from-red-500 to-rose-500" },
  { name: "Quick Responder", icon: <Zap className="w-6 h-6" />, unlocked: true, color: "from-amber-500 to-yellow-500" },
  { name: "100 Responses", icon: <Target className="w-6 h-6" />, unlocked: true, color: "from-emerald-500 to-green-500" },
  { name: "Trainer", icon: <GraduationCap className="w-6 h-6" />, unlocked: false, color: "from-sky-500 to-blue-500" },
  { name: "Community Hero", icon: <HandHeart className="w-6 h-6" />, unlocked: false, color: "from-violet-500 to-purple-500" },
  { name: "Night Owl", icon: <Moon className="w-6 h-6" />, unlocked: false, color: "from-indigo-500 to-blue-600" },
];

const trainingLevels: TrainingLevel[] = ["Basic First Aid", "Advanced CPR", "Emergency Response"];
const availabilitySlots: AvailabilitySlot[] = ["Weekdays", "Weekends", "Evenings", "24/7"];

/* ───────────────────────── helpers ───────────────────────── */

function CircularProgress({ progress, size = 48 }: { progress: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={4}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────────────────── component ───────────────────────── */

export default function CFR() {
  const [selectedLevel, setSelectedLevel] = useState<TrainingLevel | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilitySlot[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleAvailability = (slot: AvailabilitySlot) => {
    setSelectedAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-cfr.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Community First Responders
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl">
            Trained volunteers saving lives in their communities
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            <div className="rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-slate-400">Active CFRs</p>
            </div>
            <div className="rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-xs text-slate-400">Counties</p>
            </div>
            <div className="rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-white">4,523</p>
              <p className="text-xs text-slate-400">Emergencies</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Application Form */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Application Received</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Thank you for applying to become a Community First Responder. We will review your
                application and contact you within 5 business days.
              </p>
              <p className="text-slate-500 text-xs mt-2">Reference: CFR-APP-2024-3847</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-6 inline-flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                Apply to Become a CFR
              </h2>

              <div className="space-y-5">
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Full Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <Users className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Phone</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Email</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">ID Number</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <CreditCard className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="National ID"
                        className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">County</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <select className="flex-1 bg-transparent text-sm text-white outline-none appearance-none cursor-pointer">
                        <option value="" className="bg-slate-900">Select county...</option>
                        <option value="nairobi" className="bg-slate-900">Nairobi</option>
                        <option value="mombasa" className="bg-slate-900">Mombasa</option>
                        <option value="kisumu" className="bg-slate-900">Kisumu</option>
                        <option value="nakuru" className="bg-slate-900">Nakuru</option>
                        <option value="eldoret" className="bg-slate-900">Eldoret</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Constituency</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <select className="flex-1 bg-transparent text-sm text-white outline-none appearance-none cursor-pointer">
                        <option value="" className="bg-slate-900">Select constituency...</option>
                        <option value="westlands" className="bg-slate-900">Westlands</option>
                        <option value="dagoretti" className="bg-slate-900">Dagoretti</option>
                        <option value="kibra" className="bg-slate-900">Kibra</option>
                        <option value="kasarani" className="bg-slate-900">Kasarani</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Training Level */}
                <div>
                  <label className="block text-xs text-slate-400 mb-3">Training Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {trainingLevels.map((level) => {
                      const isSelected = selectedLevel === level;
                      return (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`rounded-xl border p-4 text-center transition-all duration-200 ${
                            isSelected
                              ? "ring-2 ring-red-500 bg-red-500/10 border-red-500/50"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <BadgeCheck
                            className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? "text-red-400" : "text-slate-500"}`}
                          />
                          <p className={`text-xs font-medium ${isSelected ? "text-white" : "text-slate-400"}`}>
                            {level}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs text-slate-400 mb-3">Availability</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availabilitySlots.map((slot) => {
                      const isSelected = selectedAvailability.includes(slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => toggleAvailability(slot)}
                          className={`rounded-xl border p-3 text-center text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-red-500/10 border-red-500/40 text-white"
                              : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          <span className="flex items-center justify-center gap-1.5">
                            {isSelected ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-600" />
                            )}
                            {slot}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Why Join */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Why do you want to join?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us your motivation..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none resize-none focus:border-red-500/30 transition-colors"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  Apply to Become a CFR
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-lg font-semibold mb-5 inline-flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            CFR Leaderboard
          </h2>

          {/* Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {leaderboardTop.map((person, i) => {
              const medalColors = [
                "from-amber-400 to-yellow-500 shadow-amber-500/30",
                "from-slate-400 to-slate-300 shadow-slate-500/30",
                "from-orange-600 to-amber-700 shadow-orange-500/30",
              ];
              const MedalIcon = [Trophy, Medal, Award][i];
              return (
                <div
                  key={person.name}
                  className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center transition-all duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${medalColors[i]} flex items-center justify-center mb-3 shadow-lg`}
                  >
                    <MedalIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{person.name}</h3>
                  <p className="text-xs text-slate-400 inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {person.county}
                  </p>
                  <p className="text-2xl font-bold text-white mt-2">{person.responses}</p>
                  <p className="text-xs text-slate-500">responses</p>
                </div>
              );
            })}
          </div>

          {/* Rest of Leaderboard */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-400 uppercase border-b border-white/10">
                  <th className="px-5 py-3 font-medium">Rank</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">County</th>
                  <th className="px-5 py-3 font-medium">Badges</th>
                  <th className="px-5 py-3 font-medium text-right">Responses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leaderboardRest.map((p) => (
                  <tr key={p.rank} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 text-sm font-mono text-slate-500">#{p.rank}</td>
                    <td className="px-5 py-3 text-sm font-medium text-white">{p.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-400">{p.county}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                        <Award className="w-3 h-3" />
                        {p.badges}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm font-bold text-right text-white">{p.responses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Training Modules */}
        <section>
          <h2 className="text-lg font-semibold mb-5 inline-flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            Training Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trainingModules.map((mod) => (
              <div
                key={mod.title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CircularProgress progress={mod.progress} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{mod.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{mod.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-slate-500">{mod.progress}% complete</span>
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors">
                        {mod.progress === 100 ? "Review" : "Continue"}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Badge Gallery */}
        <section className="pb-8">
          <h2 className="text-lg font-semibold mb-5 inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-400" />
            Badge Gallery
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 text-center transition-all duration-300 ${
                  badge.unlocked ? "hover:-translate-y-1" : "opacity-50 grayscale"
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-2 shadow-lg ${
                    badge.unlocked ? "" : "from-slate-600 to-slate-700"
                  }`}
                >
                  {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-400" />}
                </div>
                <p className={`text-xs font-medium ${badge.unlocked ? "text-white" : "text-slate-500"}`}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
