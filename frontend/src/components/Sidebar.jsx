import React from 'react';
import { 
  Activity, 
  HeartPulse, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  HelpCircle,
  X,
  Heart
} from 'lucide-react';

const TOPIC_PRESETS = [
  {
    id: 'pcos',
    title: 'PCOS & Hormonal Balance',
    icon: Activity,
    prompt: 'What are the core clinical symptoms and lifestyle recommendations for Polycystic Ovary Syndrome (PCOS)?',
    badge: 'Guide'
  },
  {
    id: 'endometriosis',
    title: 'Endometriosis Pain Relief',
    icon: HeartPulse,
    prompt: 'Explain the mechanisms of endometriosis pain and non-surgical symptom management strategies.',
    badge: 'Wellness'
  },
  {
    id: 'cycle',
    title: 'Menstrual Cycle & Ovulation',
    icon: Calendar,
    prompt: 'What are the main phases of the menstrual cycle and indicators of the fertile window?',
    badge: 'Tracking'
  },
  {
    id: 'nutrition',
    title: 'Stress, Sleep & Diet',
    icon: Sparkles,
    prompt: 'How do chronic stress, nutrition, and sleep hygiene impact reproductive hormone regulation?',
    badge: 'Self-Care'
  }
];

export default function Sidebar({ isOpen, onClose, onSelectPrompt, activeTopic, setActiveTopic }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full w-80 
        glass-panel border-r border-[#ff2d75]/30 bg-[#100720]/95
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header & Topic Presets */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#ff4d8d]" />
              <h2 className="font-heading font-bold text-sm tracking-wide text-white uppercase">
                Health Topics & Guides
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="lg:hidden p-1 text-gray-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Health Topic Preset Buttons */}
          <div className="space-y-2.5">
            {TOPIC_PRESETS.map((topic) => {
              const Icon = topic.icon;
              const isSelected = activeTopic === topic.id;

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopic(topic.id);
                    onSelectPrompt(topic.prompt);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    w-full text-left p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden
                    ${isSelected 
                      ? 'bg-gradient-to-r from-[#ff2d75]/25 via-[#7b2cbf]/30 to-[#120924] border-[#ff2d75]/60 shadow-cyra-glow' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#ff2d75]/40'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        p-2 rounded-lg transition-colors
                        ${isSelected ? 'bg-[#ff2d75] text-white shadow-cyra-glow' : 'bg-white/5 text-[#ff4d8d] group-hover:text-white'}
                      `}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-200 group-hover:text-white">
                          {topic.title}
                        </h3>
                        <span className="text-[10px] text-purple-300/70 font-mono">
                          {topic.badge}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#ff4d8d] translate-x-1' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Empathetic Health Note */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1c0d38] to-[#2a1350] border border-[#ff2d75]/40 shadow-cyra-glow space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#ff4d8d]">
              <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>Women's Wellness Care</span>
            </div>
            <p className="text-xs text-purple-100 leading-relaxed">
              Explore evidence-based guidance for period tracking, cycle phases, and symptom relief tailored to your unique body.
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#ff2d75]/30 bg-[#0a0512]/90 text-xs text-gray-400 space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-gray-200 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-[#ff2d75]" />
              <span>GeneScope Companion</span>
            </span>
            <span className="text-[10px] text-[#ff4d8d] font-semibold">Verified Medical Sources</span>
          </div>
        </div>
      </aside>
    </>
  );
}
