import React, { useState } from 'react';
import { Activity, Heart, Moon, Zap, Smile, CheckCircle2, ChevronRight, X } from 'lucide-react';

const SYMPTOMS = [
  { id: 'cramps', label: 'Pelvic Pain / Cramps', icon: Zap },
  { id: 'fatigue', label: 'Low Energy / Fatigue', icon: Moon },
  { id: 'mood', label: 'Mood Fluctuations', icon: Smile },
  { id: 'bloating', label: 'Abdominal Bloating', icon: Activity },
];

export default function SymptomTrackerWidget({ onAskAboutSymptoms }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleGenerateQuery = () => {
    if (selectedSymptoms.length === 0) return;
    const symptomLabels = selectedSymptoms.map(id => SYMPTOMS.find(s => s.id === id).label).join(', ');
    const query = `What are the evidence-based management strategies for experiencing ${symptomLabels}?`;
    onAskAboutSymptoms(query);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#ff2d75] to-[#c77dff] text-white text-xs font-bold shadow-cyra-glow hover:opacity-95 transition hover:scale-105"
      >
        <Activity className="w-4 h-4 animate-bounce" />
        <span>Symptom Checker</span>
      </button>

      {/* Popover / Card */}
      {isOpen && (
        <div className="absolute right-0 bottom-12 z-40 w-80 glass-panel-glow p-4 rounded-2xl border border-[#ff2d75]/50 bg-[#130826] shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-[#ff4d8d] fill-current" />
              <span>Select Current Symptoms</span>
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {SYMPTOMS.map((sym) => {
              const Icon = sym.icon;
              const isChecked = selectedSymptoms.includes(sym.id);
              return (
                <button
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={`
                    w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition
                    ${isChecked 
                      ? 'bg-[#ff2d75]/25 border-[#ff2d75]/60 text-white shadow-cyra-glow' 
                      : 'bg-white/5 border-white/10 text-purple-100 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-3.5 h-3.5 ${isChecked ? 'text-[#ff4d8d]' : 'text-purple-300'}`} />
                    <span>{sym.label}</span>
                  </div>
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d8d]" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleGenerateQuery}
            disabled={selectedSymptoms.length === 0}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ff2d75] to-[#c77dff] text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-cyra-glow transition flex items-center justify-center space-x-1.5"
          >
            <span>Ask GeneScope AI</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
