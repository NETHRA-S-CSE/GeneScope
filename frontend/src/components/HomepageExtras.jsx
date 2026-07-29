import React, { useState } from 'react';
import { Lightbulb, X, CheckCircle2, XCircle, Clock } from 'lucide-react';

const CHIPS = [
  { label: 'What causes PCOS?', prompt: 'What causes PCOS?' },
  { label: 'Can stress delay periods?', prompt: 'Can stress delay periods?' },
  { label: 'Foods for iron deficiency', prompt: 'What foods help with iron deficiency during menstruation?' },
  { label: 'What is ovulation?', prompt: 'What is ovulation and how does it work?' },
  { label: 'Normal cycle length?', prompt: 'What is a normal menstrual cycle length?' },
];

export function QuickChips({ onAsk }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHIPS.map(({ label, prompt }) => (
        <button key={label} onClick={() => onAsk(prompt)}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition hover:scale-105"
          style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', color: 'var(--text-secondary)', backdropFilter: 'blur(8px)' }}>
          {label}
        </button>
      ))}
    </div>
  );
}

const DYK_CARDS = [
  'A healthy menstrual cycle can range from 21–35 days.',
  'Estrogen peaks just before ovulation, boosting energy and mood.',
  'Iron-rich foods like spinach and lentils help replenish blood loss during periods.',
  'Stress can delay ovulation by suppressing LH surge.',
];

export function DidYouKnow({ onAsk }) {
  const [idx] = useState(() => Math.floor(Math.random() * DYK_CARDS.length));
  return (
    <div className="p-4 rounded-2xl" style={{ background: 'var(--purple-muted)', border: '1px solid var(--surface-border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-3.5 h-3.5" style={{ color: 'var(--purple)' }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--purple)' }}>Did You Know?</span>
      </div>
      <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{DYK_CARDS[idx]}</p>
      <button onClick={() => onAsk(DYK_CARDS[idx])} className="text-[10px] font-semibold" style={{ color: 'var(--purple)' }}>
        Learn More →
      </button>
    </div>
  );
}

const MYTHS = [
  { myth: 'Period pain is always normal.', fact: 'Severe pain may indicate conditions like endometriosis or fibroids.' },
  { myth: 'You can\'t get pregnant during your period.', fact: 'Sperm can survive up to 5 days, making pregnancy possible near ovulation.' },
  { myth: 'Irregular periods are always a sign of PCOS.', fact: 'Many conditions and lifestyle factors can cause irregular cycles.' },
];

export function MythFact() {
  const [idx] = useState(() => Math.floor(Math.random() * MYTHS.length));
  const { myth, fact } = MYTHS[idx];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--surface-border)' }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.08)' }}>
        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Myth</span>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{myth}</p>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(34,197,94,0.08)' }}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Fact</span>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{fact}</p>
        </div>
      </div>
    </div>
  );
}

export function RecentlyViewed({ topics, onAsk }) {
  if (!topics?.length) return null;
  return (
    <div className="p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
      <div className="flex items-center gap-2 mb-2.5">
        <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Continue Reading</span>
      </div>
      <div className="space-y-1.5">
        {topics.slice(0, 4).map((t, i) => (
          <button key={i} onClick={() => onAsk(t)}
            className="flex items-center gap-2 text-xs w-full text-left transition"
            style={{ color: 'var(--text-secondary)' }}>
            <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />
            <span className="truncate">{t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
