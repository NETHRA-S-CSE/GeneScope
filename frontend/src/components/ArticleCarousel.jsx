import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    tag: 'PCOS',
    title: 'Understanding PCOS',
    points: ['Hormonal imbalance affecting ovulation', 'Affects 1 in 10 women of reproductive age', 'Manageable with lifestyle changes'],
    prompt: 'Give me a comprehensive overview of PCOS including symptoms, causes, and management.',
    color: 'var(--accent)',
  },
  {
    tag: 'Hormones',
    title: 'Hormonal Acne Explained',
    points: ['Linked to androgen fluctuations', 'Common during luteal phase', 'Diet and skincare can help'],
    prompt: 'How does hormonal acne develop and what are evidence-based treatments?',
    color: 'var(--purple)',
  },
  {
    tag: 'Cycle',
    title: 'Menstrual Cycle Basics',
    points: ['Four distinct phases each cycle', 'Hormones drive each phase', 'Normal cycle: 21–35 days'],
    prompt: 'Explain the four phases of the menstrual cycle and what happens hormonally in each.',
    color: '#0ea5e9',
  },
  {
    tag: 'Endometriosis',
    title: 'Living with Endometriosis',
    points: ['Tissue grows outside the uterus', 'Causes chronic pelvic pain', 'Early diagnosis improves outcomes'],
    prompt: 'What is endometriosis, how is it diagnosed, and what are the treatment options?',
    color: '#10b981',
  },
];

export default function ArticleCarousel({ onAsk }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % ARTICLES.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  const article = ARTICLES[idx];

  return (
    <div className="w-full rounded-2xl p-4 relative overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', backdropFilter: 'blur(12px)' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Featured Today</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIdx(i => (i - 1 + ARTICLES.length) % ARTICLES.length)}
            className="p-1 rounded-lg transition" style={{ color: 'var(--text-muted)' }}>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIdx(i => (i + 1) % ARTICLES.length)}
            className="p-1 rounded-lg transition" style={{ color: 'var(--text-muted)' }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="animate-fadeIn" key={idx}>
        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2"
          style={{ background: `${article.color}20`, color: article.color, border: `1px solid ${article.color}40` }}>
          {article.tag}
        </span>
        <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{article.title}</h3>
        <ul className="space-y-1 mb-3">
          {article.points.map((p, i) => (
            <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: article.color }} />
              {p}
            </li>
          ))}
        </ul>
        <button onClick={() => onAsk(article.prompt)}
          className="flex items-center gap-1.5 text-xs font-semibold transition"
          style={{ color: article.color }}>
          <span>Read More</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex gap-1 mt-3">
        {ARTICLES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="h-1 rounded-full transition-all duration-300"
            style={{ width: i === idx ? '20px' : '6px', background: i === idx ? 'var(--accent)' : 'var(--surface-border)' }} />
        ))}
      </div>
    </div>
  );
}
