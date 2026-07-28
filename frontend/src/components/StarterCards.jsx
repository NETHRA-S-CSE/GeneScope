import React from 'react';
import { 
  Activity, 
  HeartPulse, 
  Calendar, 
  Moon, 
  ShieldCheck, 
  ArrowRight,
  Heart
} from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    icon: Activity,
    category: 'PCOS & Hormones',
    question: 'What are the key clinical symptoms and lifestyle recommendations for Polycystic Ovary Syndrome (PCOS)?',
    color: 'from-[#ff2d75]/25 to-[#7b2cbf]/25',
    borderColor: 'border-[#ff2d75]/40'
  },
  {
    icon: HeartPulse,
    category: 'Pain & Endometriosis',
    question: 'How can severe period pain and pelvic pain associated with endometriosis be managed effectively?',
    color: 'from-[#7b2cbf]/25 to-[#c77dff]/20',
    borderColor: 'border-[#7b2cbf]/40'
  },
  {
    icon: Calendar,
    category: 'Cycle Tracking',
    question: 'What biological signals and body temperatures indicate the exact ovulation phase in a normal cycle?',
    color: 'from-[#ff2d75]/20 to-[#ff6584]/20',
    borderColor: 'border-[#ff6584]/40'
  },
  {
    icon: Moon,
    category: 'Stress & Sleep',
    question: 'In what ways do sleep hygiene, cortisol levels, and dietary habits influence menstrual regularity?',
    color: 'from-[#c77dff]/20 to-[#ff2d75]/20',
    borderColor: 'border-[#c77dff]/40'
  }
];

export default function StarterCards({ onSelectQuestion }) {
  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 px-4 text-center my-auto">
      {/* Hero Welcome */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ff2d75]/25 via-[#7b2cbf]/30 to-[#c77dff]/25 border border-[#ff2d75]/50 text-[11px] text-[#ff4d8d] font-semibold mb-2 shadow-cyra-glow">
        <Heart className="w-3 h-3 fill-current text-[#ff2d75] animate-pulse" />
        <span>Women's Reproductive Health Companion</span>
      </div>

      <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-white tracking-tight mb-1.5 drop-shadow-md">
        Welcome to <span className="bg-gradient-to-r from-white via-[#ff4d8d] to-[#c77dff] bg-clip-text text-transparent">GeneScope</span>
      </h2>
      <p className="text-purple-100/80 text-xs sm:text-sm max-w-xl mx-auto mb-4 leading-relaxed font-medium">
        Your dedicated AI companion for women's period health, cycle tracking, PCOS, and evidence-based reproductive wellness guidance.
      </p>

      {/* Grid of Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto text-left">
        {SAMPLE_QUESTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectQuestion(item.question)}
              className={`
                p-3.5 rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color}
                hover:scale-[1.02] hover:border-[#ff2d75] hover:shadow-cyra-glow transition-all duration-200 group text-left flex flex-col justify-between
                glass-panel bg-[#180b33]/80
              `}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold tracking-wider text-[#ff4d8d] uppercase flex items-center space-x-1">
                    <Icon className="w-3 h-3 inline mr-1 text-[#ff2d75]" />
                    {item.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-[#ff4d8d] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-gray-100 group-hover:text-white font-medium line-clamp-2 leading-snug">
                  "{item.question}"
                </p>
              </div>

              <div className="mt-2.5 text-[10px] text-purple-200/70 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Based on certified medical literature</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
