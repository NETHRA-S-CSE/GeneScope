import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="w-full shrink-0 flex items-center justify-between px-4 py-1.5 text-[11px]" style={{ background: 'var(--accent-muted)', borderBottom: '1px solid var(--accent-border)', color: 'var(--text-secondary)' }}>
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />
        <span>For educational purposes only — not a substitute for professional medical advice.</span>
      </div>
      <button onClick={() => setDismissed(true)} className="p-0.5 rounded transition ml-2" style={{ color: 'var(--text-muted)' }}>
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
