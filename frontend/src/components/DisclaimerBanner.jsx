import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full shrink-0 bg-gradient-to-r from-[#1a0b30] via-[#251042] to-[#1a0b30] border-b border-[#ff2d75]/40 px-4 py-1.5 text-xs text-purple-100 flex items-center justify-between shadow-sm relative z-20">
      <div className="flex items-center space-x-2 max-w-5xl mx-auto truncate">
        <ShieldAlert className="w-3.5 h-3.5 text-[#ff4d8d] shrink-0 animate-pulse" />
        <p className="truncate text-[11px]">
          <strong className="text-[#ff4d8d] font-semibold">Medical Notice:</strong> GeneScope provides evidence-based information for educational support and does not replace professional clinical diagnosis.
        </p>
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="p-1 text-purple-300 hover:text-white rounded hover:bg-white/10 transition shrink-0 ml-2"
        title="Dismiss notice"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
