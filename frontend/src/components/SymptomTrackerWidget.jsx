import React, { useState } from 'react';
import { Activity, Zap, Moon, Smile, CheckCircle2, X, ChevronRight } from 'lucide-react';

const SYMPTOMS = [
  { id: 'cramps', label: 'Pelvic Cramps', icon: Zap },
  { id: 'fatigue', label: 'Fatigue', icon: Moon },
  { id: 'mood', label: 'Mood Changes', icon: Smile },
  { id: 'bloating', label: 'Bloating', icon: Activity },
];

export default function SymptomTrackerWidget({ onAskAboutSymptoms }) {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  const handleAsk = () => {
    if (!selected.length) return;
    const labels = selected.map(id => SYMPTOMS.find(s => s.id === id).label).join(', ');
    onAskAboutSymptoms(`What are evidence-based strategies for managing ${labels}?`);
    setOpen(false);
    setSelected([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition"
        style={{ background: 'var(--accent-muted)', border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
      >
        <Activity className="w-3.5 h-3.5" />
        <span>Symptom Check</span>
      </button>

      {open && (
        <div className="absolute right-0 bottom-10 z-40 w-64 rounded-2xl p-4 shadow-xl animate-fadeIn"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)', backdropFilter: 'blur(16px)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Select symptoms</span>
            <button onClick={() => setOpen(false)} style={{ color: 'var(--text-muted)' }}><X className="w-3.5 h-3.5" /></button>
          </div>

          <div className="space-y-1.5 mb-3">
            {SYMPTOMS.map(({ id, label, icon: Icon }) => {
              const checked = selected.includes(id);
              return (
                <button key={id} onClick={() => toggle(id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition"
                  style={{
                    background: checked ? 'var(--accent-muted)' : 'var(--surface)',
                    border: `1px solid ${checked ? 'var(--accent-border)' : 'var(--surface-border)'}`,
                    color: checked ? 'var(--accent)' : 'var(--text-secondary)',
                  }}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </div>
                  {checked && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />}
                </button>
              );
            })}
          </div>

          <button onClick={handleAsk} disabled={!selected.length}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition disabled:opacity-40"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <span>Ask GeneScope</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
