import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SUGGESTIONS = [
  'PCOS', 'PCOS symptoms', 'PCOS treatment', 'PCOS diet',
  'Period delay', 'Period pain', 'Period cramps relief',
  'Hormonal acne', 'Hormonal imbalance',
  'Endometriosis', 'Endometriosis pain',
  'Ovulation signs', 'Ovulation tracking',
  'Iron deficiency', 'Iron rich foods',
  'Menstrual cycle phases', 'Menstrual irregularity',
  'Fertility window', 'Stress and periods',
];

export default function SearchBar({ onAsk }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query.length > 1
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const submit = (text) => {
    onAsk(text);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', backdropFilter: 'blur(12px)' }}>
        <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onKeyDown={e => { if (e.key === 'Enter' && query.trim()) submit(query.trim()); }}
          onFocus={() => setOpen(true)}
          placeholder="Search health topics…"
          className="flex-1 text-xs bg-transparent focus:outline-none"
          style={{ color: 'var(--text-primary)' }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }} style={{ color: 'var(--text-muted)' }}>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)' }}>
          {filtered.map((s, i) => (
            <button key={i} onClick={() => submit(s)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition"
              style={{ color: 'var(--text-secondary)', borderBottom: i < filtered.length - 1 ? '1px solid var(--surface-border)' : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-muted)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Search className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
