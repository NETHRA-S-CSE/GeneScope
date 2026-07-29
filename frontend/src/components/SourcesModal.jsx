import React from 'react';
import { X, FileText, ShieldCheck } from 'lucide-react';

export default function SourcesModal({ sources, onClose }) {
  if (!sources?.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl p-5 shadow-2xl"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)' }}>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Medical References</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sources.length} source{sources.length > 1 ? 's' : ''} cited</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition" style={{ color: 'var(--text-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto">
          {sources.map((src, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
              <div className="flex items-center gap-2.5">
                <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{src.file}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" style={{ color: '#22c55e' }} />
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Verified literature</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg" style={{ background: 'var(--purple-muted)', color: 'var(--purple)' }}>
                p.{src.page}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
