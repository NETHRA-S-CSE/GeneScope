import React from 'react';
import { Activity, HeartPulse, Calendar, Sparkles, X } from 'lucide-react';

const TOPICS = [
  { id: 'pcos', label: 'PCOS & Hormones', icon: Activity, prompt: 'What are the core symptoms and lifestyle recommendations for PCOS?' },
  { id: 'endometriosis', label: 'Endometriosis', icon: HeartPulse, prompt: 'Explain endometriosis pain mechanisms and non-surgical management.' },
  { id: 'cycle', label: 'Cycle & Ovulation', icon: Calendar, prompt: 'What are the main menstrual cycle phases and fertile window indicators?' },
  { id: 'nutrition', label: 'Stress, Sleep & Diet', icon: Sparkles, prompt: 'How do stress, sleep, and nutrition affect reproductive hormones?' },
];

export default function Sidebar({ isOpen, onClose, onSelectPrompt, activeTopic, setActiveTopic }) {
  return (
    <>
      {isOpen && <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" />}

      <aside className={`fixed lg:static top-0 left-0 z-50 h-full w-64 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--surface-border)' }}>

        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--surface-border)' }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Topics</span>
          <button onClick={onClose} className="lg:hidden p-1 rounded" style={{ color: 'var(--text-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {TOPICS.map(({ id, label, icon: Icon, prompt }) => {
            const active = activeTopic === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTopic(id); onSelectPrompt(prompt); if (window.innerWidth < 1024) onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition"
                style={{
                  background: active ? 'var(--accent-muted)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  border: active ? '1px solid var(--accent-border)' : '1px solid transparent',
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
