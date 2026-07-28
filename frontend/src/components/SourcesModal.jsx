import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function SourcesModal({ sources, onClose }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-lg rounded-2xl border border-cyra-border p-6 shadow-2xl relative bg-[#120d1d]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#e84393] to-[#a29bfe] text-white">
            <Heart className="w-5 h-5 fill-current text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Medical Literature References
            </h3>
            <p className="text-xs text-gray-400">
              Verified against {sources.length} health reference document(s)
            </p>
          </div>
        </div>

        {/* Sources List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {sources.map((src, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyra-border transition flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#e84393]/20 text-[#ff7675]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-200">
                    {src.file}
                  </h4>
                  <p className="text-[11px] text-gray-400 flex items-center space-x-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
                    <span>Certified Health Literature</span>
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#a29bfe]/20 text-[#a29bfe] border border-[#a29bfe]/30">
                  Page {src.page}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center space-x-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Evidence-based medical guidance</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e84393] to-[#d63031] text-white font-semibold hover:opacity-90 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
