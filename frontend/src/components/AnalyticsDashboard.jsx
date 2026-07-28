import React, { useState } from 'react';
import { 
  HeartPulse, 
  Calendar, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Droplet,
  X,
  UserCheck
} from 'lucide-react';

export default function AnalyticsDashboard({ messages, isOpen, onClose }) {
  if (!isOpen) return null;

  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [currentDay, setCurrentDay] = useState(14); // Default mid-cycle / ovulation

  // Determine Cycle Phase
  let phase = "Follicular Phase";
  let phaseColor = "from-[#ff2d75] to-[#ff4d8d]";
  let phaseDescription = "Energy levels rising. Ideal time for exercise and light nutrition.";

  if (currentDay <= periodLength) {
    phase = "Menstrual Phase";
    phaseColor = "from-[#ff006e] to-[#ff2d75]";
    phaseDescription = "Rest & hydration recommended. Iron and magnesium rich foods support comfort.";
  } else if (currentDay >= 12 && currentDay <= 16) {
    phase = "Ovulation Window (Peak Fertility)";
    phaseColor = "from-[#ff2d75] via-[#ff4d8d] to-[#c77dff]";
    phaseDescription = "Estrogen peaks. High energy, heightened fertility, and optimal vitality.";
  } else if (currentDay > 16) {
    phase = "Luteal Phase";
    phaseColor = "from-[#7b2cbf] to-[#c77dff]";
    phaseDescription = "Progesterone dominant. Focus on stress management, hydration, and complex carbs.";
  }

  // Count health inquiries made by user
  const userQueries = messages.filter(m => m.sender === 'user').map(m => m.text.toLowerCase());
  const symptomCounts = {
    cramps: userQueries.filter(q => q.includes('cramp') || q.includes('pain') || q.includes('dysmenorrhea')).length,
    pcos: userQueries.filter(q => q.includes('pcos') || q.includes('hormon') || q.includes('acne') || q.includes('hair')).length,
    fatigue: userQueries.filter(q => q.includes('fatigue') || q.includes('energy') || q.includes('sleep') || q.includes('tired')).length,
    cycle: userQueries.filter(q => q.includes('cycle') || q.includes('period') || q.includes('ovulat') || q.includes('fertil')).length,
  };

  const totalHealthQuestions = userQueries.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-2xl rounded-2xl border border-[#ff2d75]/50 p-6 shadow-2xl relative bg-[#0d0519] overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-[#ff2d75]/25 rounded-full blur-[96px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-[#c77dff]/25 rounded-full blur-[96px]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#ff2d75] to-[#c77dff] text-white shadow-cyra-glow">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white tracking-tight flex items-center space-x-2">
                <span>Personal Cycle & Health Analytics</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#ff2d75]/20 text-[#ff4d8d] border border-[#ff2d75]/40 font-bold shadow-sm">
                  WOMEN'S WELLNESS
                </span>
              </h3>
              <p className="text-xs text-purple-200/70 font-medium">Track your cycle phase, symptom insights, and health summary</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cycle Phase Live Card */}
        <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#200c3b] via-[#32135c] to-[#200c3b] border border-[#ff2d75]/50 shadow-cyra-glow mb-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-[11px] font-bold text-[#ff4d8d] uppercase tracking-wider flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#ff2d75]" />
                Current Cycle Phase
              </span>
              <h4 className="font-heading font-bold text-xl text-white mt-0.5">
                Day {currentDay} of {cycleLength} — <span className="bg-gradient-to-r from-white via-[#ff4d8d] to-[#c77dff] bg-clip-text text-transparent">{phase}</span>
              </h4>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs text-purple-200">Set Day:</label>
              <input
                type="number"
                min="1"
                max={cycleLength}
                value={currentDay}
                onChange={(e) => setCurrentDay(Math.max(1, Math.min(cycleLength, parseInt(e.target.value) || 1)))}
                className="w-14 px-2 py-1 rounded-lg bg-white/10 border border-[#ff2d75]/40 text-white font-bold text-xs text-center focus:outline-none focus:border-[#ff2d75]"
              />
            </div>
          </div>

          {/* Phase Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-2">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${phaseColor} transition-all duration-300 shadow-cyra-glow`}
              style={{ width: `${(currentDay / cycleLength) * 100}%` }}
            />
          </div>

          <p className="text-xs text-purple-100 leading-relaxed flex items-start space-x-1.5 mt-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#ff4d8d] flex-shrink-0 mt-0.5" />
            <span>{phaseDescription}</span>
          </p>
        </div>

        {/* Health Metrics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
            <div className="flex items-center justify-between text-purple-300 mb-1">
              <span className="text-[11px] font-semibold uppercase">Cycle Regularity</span>
              <Activity className="w-3.5 h-3.5 text-[#ff4d8d]" />
            </div>
            <div className="font-heading font-bold text-lg text-emerald-400">Normal (28d)</div>
            <div className="text-[10px] text-purple-300/70 mt-1">Typical 21-35 day window</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
            <div className="flex items-center justify-between text-purple-300 mb-1">
              <span className="text-[11px] font-semibold uppercase">Fertile Window</span>
              <Droplet className="w-3.5 h-3.5 text-[#c77dff]" />
            </div>
            <div className="font-heading font-bold text-lg text-[#c77dff]">Days 12–16</div>
            <div className="text-[10px] text-purple-300/70 mt-1">Peak Ovulation Phase</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
            <div className="flex items-center justify-between text-purple-300 mb-1">
              <span className="text-[11px] font-semibold uppercase">Logged Inquiries</span>
              <HeartPulse className="w-3.5 h-3.5 text-[#ff2d75]" />
            </div>
            <div className="font-heading font-bold text-lg text-white">{totalHealthQuestions}</div>
            <div className="text-[10px] text-purple-300/70 mt-1">Session questions</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
            <div className="flex items-center justify-between text-purple-300 mb-1">
              <span className="text-[11px] font-semibold uppercase">Wellness Status</span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-heading font-bold text-lg text-emerald-400">Good</div>
            <div className="text-[10px] text-emerald-400 mt-1">Balanced Wellness</div>
          </div>
        </div>

        {/* Topic & Symptom Inquiry Breakdown */}
        <div className="space-y-4 relative z-10 mb-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 glass-panel">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5 mb-3">
              <Activity className="w-3.5 h-3.5 text-[#ff4d8d]" />
              <span>Your Health Topics of Interest</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-purple-100">Period Pain & Cramps</span>
                <span className="font-mono font-bold text-[#ff4d8d]">{symptomCounts.cramps} asked</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-purple-100">PCOS & Hormones</span>
                <span className="font-mono font-bold text-[#c77dff]">{symptomCounts.pcos} asked</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-purple-100">Fatigue & Sleep</span>
                <span className="font-mono font-bold text-amber-300">{symptomCounts.fatigue} asked</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-purple-100">Cycle & Ovulation</span>
                <span className="font-mono font-bold text-emerald-400">{symptomCounts.cycle} asked</span>
              </div>
            </div>
          </div>

          {/* Actionable Health Tips for Women */}
          <div className="p-4 rounded-xl bg-[#190a33] border border-[#ff2d75]/40 space-y-2 text-xs">
            <h4 className="font-bold text-[#ff4d8d] flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Essential Reproductive Health Checklist</span>
            </h4>
            <ul className="space-y-1.5 text-purple-100 list-disc list-inside leading-relaxed">
              <li>Stay hydrated with 2-2.5L of water daily to reduce menstrual bloating and cramps.</li>
              <li>Include magnesium-rich foods (dark leafy greens, nuts, seeds) to support muscle relaxation.</li>
              <li>Track severe or persistent pelvic pain to share with your gynecologist.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end relative z-10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff2d75] to-[#c77dff] text-white text-xs font-bold hover:shadow-cyra-glow transition"
          >
            Close Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
