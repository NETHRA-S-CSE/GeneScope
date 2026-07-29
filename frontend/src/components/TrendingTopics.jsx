import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

const TRENDING = [
  { label: 'PCOS', prompt: 'What are the symptoms and treatment options for PCOS?' },
  { label: 'Period Delay', prompt: 'What causes a delayed period and when should I be concerned?' },
  { label: 'Hormonal Acne', prompt: 'How does hormonal acne develop and how can it be treated?' },
  { label: 'Iron Deficiency', prompt: 'How does iron deficiency affect menstruation and what foods help?' },
  { label: 'Endometriosis', prompt: 'What is endometriosis and how is it managed?' },
  { label: 'Ovulation Signs', prompt: 'What are the physical signs of ovulation?' },
];

export default function TrendingTopics({ onAsk }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2.5">
        <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Trending</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {TRENDING.map(({ label, prompt }) => (
          <button key={label} onClick={() => onAsk(prompt)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition hover:scale-105"
            style={{ background: 'var(--accent-muted)', border: '1px solid var(--accent-border)', color: 'var(--accent)' }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RelatedTopics({ topics, onAsk }) {
  if (!topics?.length) return null;
  return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--surface-border)' }}>
      <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Related Topics</p>
      <div className="space-y-1">
        {topics.map((t, i) => (
          <button key={i} onClick={() => onAsk(`Tell me about ${t}`)}
            className="flex items-center gap-2 text-xs w-full text-left transition py-1"
            style={{ color: 'var(--text-secondary)' }}>
            <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
