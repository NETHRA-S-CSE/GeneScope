import React, { useState } from 'react';
import { X, Calendar, Activity, HeartPulse, Droplet, Sparkles } from 'lucide-react';

const PHASES = [
  { label: 'Menstrual', range: [1, 5], color: '#e91e8c', desc: 'Rest & hydration. Iron-rich foods support comfort.' },
  { label: 'Follicular', range: [6, 11], color: '#a855f7', desc: 'Energy rising. Good time for exercise and light nutrition.' },
  { label: 'Ovulation', range: [12, 16], color: '#c2185b', desc: 'Peak fertility. High energy and optimal vitality.' },
  { label: 'Luteal', range: [17, 28], color: '#7c3aed', desc: 'Progesterone dominant. Focus on stress management and complex carbs.' },
];

function getPhase(day) {
  return PHASES.find(p => day >= p.range[0] && day <= p.range[1]) || PHASES[1];
}

export default function AnalyticsDashboard({ messages, isOpen, onClose }) {
  const [day, setDay] = useState(14);
  const [cycleLen] = useState(28);
  if (!isOpen) return null;

  const phase = getPhase(day);
  const queries = messages.filter(m => m.sender === 'user').map(m => m.text.toLowerCase());
  const counts = {
    'Period Pain': queries.filter(q => q.includes('cramp') || q.includes('pain')).length,
    'PCOS': queries.filter(q => q.includes('pcos') || q.includes('hormon')).length,
    'Fatigue': queries.filter(q => q.includes('fatigue') || q.includes('sleep')).length,
    'Cycle': queries.filter(q => q.includes('cycle') || q.includes('ovulat')).length,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)' }}>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Cycle Analytics</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Track your phase and health insights</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition" style={{ color: 'var(--text-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Phase Card */}
        <div className="p-4 rounded-2xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5" style={{ color: phase.color }} />
                <span className="text-xs font-semibold" style={{ color: phase.color }}>{phase.label} Phase</span>
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Day {day} of {cycleLen}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Day</span>
              <input type="number" min="1" max={cycleLen} value={day}
                onChange={e => setDay(Math.max(1, Math.min(cycleLen, +e.target.value || 1)))}
                className="w-12 px-2 py-1 rounded-lg text-xs text-center focus:outline-none"
                style={{ background: 'var(--bg)', border: '1px solid var(--surface-border)', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div className="w-full rounded-full h-1.5 mb-3" style={{ background: 'var(--surface-border)' }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(day / cycleLen) * 100}%`, background: phase.color }} />
          </div>

          <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
            <span>{phase.desc}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Activity, label: 'Cycle', value: '28d', sub: 'Regular' },
            { icon: Droplet, label: 'Fertile', value: '12–16', sub: 'Days' },
            { icon: HeartPulse, label: 'Questions', value: queries.length, sub: 'This session' },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="p-3 rounded-xl text-center" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
              <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
              <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Topic Breakdown */}
        <div className="p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>Topics explored</p>
          <div className="space-y-2">
            {Object.entries(counts).map(([topic, count]) => (
              <div key={topic} className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-secondary)' }}>{topic}</span>
                <span className="font-mono font-semibold" style={{ color: count > 0 ? 'var(--accent)' : 'var(--text-muted)' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
