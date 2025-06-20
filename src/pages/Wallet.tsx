import { useState } from "react";
import {
  Eye,
  EyeOff,
  Plus,
  Send,
  Check,
  ChevronRight,
  Wallet,
  Smartphone,
  Shield,
  Star,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  RefreshCw,
  Crown,
  Users,
  Ambulance,
  Pill,
  HeartPulse,
} from "lucide-react";

/* ───────────────────────── types ───────────────────────── */

type TransactionType = "Top-up" | "Subscription" | "Emergency";
type FilterType = "All" | TransactionType;

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  amount: number;
  credit: boolean;
  balance: number;
}

/* ───────────────────────── mock data ───────────────────────── */

const transactions: Transaction[] = [
  { id: "TXN-8921", date: "Jun 18, 2024", description: "M-Pesa Top-up", type: "Top-up", amount: 1000, credit: true, balance: 3450 },
  { id: "TXN-8920", date: "Jun 15, 2024", description: "Family Plan Subscription", type: "Subscription", amount: 500, credit: false, balance: 2450 },
  { id: "TXN-8919", date: "Jun 10, 2024", description: "Emergency Ambulance Dispatch", type: "Emergency", amount: 200, credit: false, balance: 2950 },
  { id: "TXN-8918", date: "Jun 08, 2024", description: "M-Pesa Top-up", type: "Top-up", amount: 2000, credit: true, balance: 3150 },
  { id: "TXN-8917", date: "May 15, 2024", description: "Family Plan Subscription", type: "Subscription", amount: 500, credit: false, balance: 1150 },
  { id: "TXN-8916", date: "May 12, 2024", description: "Hospital Referral Fee", type: "Emergency", amount: 150, credit: false, balance: 1650 },
  { id: "TXN-8915", date: "May 10, 2024", description: "M-Pesa Top-up", type: "Top-up", amount: 1500, credit: true, balance: 1800 },
  { id: "TXN-8914", date: "Apr 15, 2024", description: "Family Plan Subscription", type: "Subscription", amount: 500, credit: false, balance: 300 },
];

const filterPills: FilterType[] = ["All", "Top-up", "Subscription", "Emergency"];

const basicFeatures = ["Emergency dispatch", "1 county coverage", "Basic hospital finder", "Email support"];
const familyFeatures = ["Everything in Basic", "Multi-county coverage", "CFR priority dispatch", "Blood bank access", "24/7 phone support"];
const premiumFeatures = ["Everything in Family", "Nationwide coverage", "Premium hospital network", "Free ambulance (4/yr)", "Personal health advisor", "Family accounts (5)"];

/* ───────────────────────── helpers ───────────────────────── */

function TransactionBadge({ type }: { type: TransactionType }) {
  const styles = {
    "Top-up": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Subscription: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    Emergency: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[type]}`}>
      {type}
    </span>
  );
}

/* ───────────────────────── component ───────────────────────── */

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedPlan, setSelectedPlan] = useState<string | null>("family");

  const filteredTransactions =
    activeFilter === "All" ? transactions : transactions.filter((t) => t.type === activeFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1E3A5F] to-[#1E3A5F]/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Wallet className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold tracking-tight">SHIELD Wallet</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Manage your emergency response payments
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0f2035] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium text-slate-300">SHIELD Wallet</span>
              </div>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {balanceVisible ? <Eye className="w-4 h-4 text-slate-300" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
              </button>
            </div>

            <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {balanceVisible ? "KES 2,450" : "KES ••••"}
            </p>

            {/* M-Pesa Connected */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">M-Pesa Connected</span>
              <Check className="w-3 h-3 text-emerald-400" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300">
                <Plus className="w-4 h-4" />
                Top Up
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <section>
          <h2 className="text-lg font-semibold mb-5 inline-flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            Subscription Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Basic */}
            <div
              className={`rounded-2xl border bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                selectedPlan === "basic" ? "border-emerald-500/50 ring-1 ring-emerald-500/30" : "border-white/10"
              }`}
              onClick={() => setSelectedPlan("basic")}
            >
              <h3 className="text-sm font-medium text-slate-400">Basic</h3>
              <p className="text-3xl font-bold text-white mt-1">
                KES 200<span className="text-sm font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-2">
                {basicFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedPlan === "basic"
                    ? "border border-emerald-500 text-emerald-400"
                    : "border border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {selectedPlan === "basic" ? "Selected" : "Select"}
              </button>
            </div>

            {/* Family - Featured */}
            <div
              className={`relative rounded-2xl border bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                selectedPlan === "family"
                  ? "border-red-500 shadow-lg shadow-red-500/10"
                  : "border-red-500/30 shadow-lg shadow-red-500/5"
              }`}
              onClick={() => setSelectedPlan("family")}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-medium shadow-lg">
                  Popular
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-400 mt-2">Family</h3>
              <p className="text-3xl font-bold text-white mt-1">
                KES 500<span className="text-sm font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-2">
                {familyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all">
                {selectedPlan === "family" ? "Current Plan" : "Select"}
              </button>
            </div>

            {/* Premium */}
            <div
              className={`rounded-2xl border bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                selectedPlan === "premium"
                  ? "border-amber-500/50 ring-1 ring-amber-500/30"
                  : "border-amber-500/30"
              }`}
              onClick={() => setSelectedPlan("premium")}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-medium text-amber-400">Premium</h3>
              </div>
              <p className="text-3xl font-bold text-white mt-1">
                KES 1,000<span className="text-sm font-normal text-slate-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-2">
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedPlan === "premium"
                    ? "border border-amber-500 text-amber-400"
                    : "border border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {selectedPlan === "premium" ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </section>

        {/* Transaction History */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold inline-flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-slate-400" />
              Transaction History
            </h2>
            <div className="flex flex-wrap gap-2">
              {filterPills.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeFilter === f
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-400 uppercase border-b border-white/5">
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                  <th className="px-6 py-3 font-medium text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-3.5 text-sm text-slate-400">{t.date}</td>
                    <td className="px-6 py-3.5 text-sm font-medium text-white">{t.description}</td>
                    <td className="px-6 py-3.5">
                      <TransactionBadge type={t.type} />
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right">
                      <span className={`inline-flex items-center gap-1 font-medium ${t.credit ? "text-emerald-400" : "text-red-400"}`}>
                        {t.credit ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                        {t.credit ? "+" : "-"}KES {t.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right text-slate-400 font-mono">
                      {t.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="pb-8">
          <h2 className="text-lg font-semibold mb-5 inline-flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            Payment Methods
          </h2>
          <div className="max-w-md">
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-green-600/5 backdrop-blur-lg p-5 relative overflow-hidden">
              {/* M-Pesa branding */}
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-emerald-500/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">M-Pesa</p>
                    <p className="text-xs text-emerald-400">Primary payment method</p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                    <Check className="w-3 h-3" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Phone Number</p>
                    <p className="text-sm font-medium text-white font-mono">+254 712 345 678</p>
                  </div>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
