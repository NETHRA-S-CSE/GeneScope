import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bot, User, Copy, Check, Volume2, VolumeX,
  FileText, ChevronDown, ChevronUp, Bookmark, BookmarkCheck,
  ThumbsUp, ThumbsDown, ArrowRight
} from 'lucide-react';

const SECTION_KEYS = ['Overview', 'Symptoms', 'Causes', 'Treatment', 'Lifestyle Tips', 'When to See a Doctor'];

function extractSections(text) {
  const sections = {};
  let remaining = text;
  SECTION_KEYS.forEach(key => {
    const regex = new RegExp(`\\*{0,2}${key}\\*{0,2}[:\\s]*([\\s\\S]*?)(?=${SECTION_KEYS.filter(k => k !== key).map(k => `\\*{0,2}${k}\\*{0,2}[:\\s]`).join('|')}|$)`, 'i');
    const match = remaining.match(regex);
    if (match) sections[key] = match[1].trim();
  });
  return Object.keys(sections).length >= 2 ? sections : null;
}

function inferTags(text) {
  const t = text.toLowerCase();
  const tags = [];
  if (t.includes('pcos') || t.includes('polycystic')) tags.push({ label: 'PCOS', color: 'var(--accent)' });
  if (t.includes('hormon')) tags.push({ label: 'Hormones', color: 'var(--purple)' });
  if (t.includes('nutrition') || t.includes('diet') || t.includes('food')) tags.push({ label: 'Nutrition', color: '#10b981' });
  if (t.includes('lifestyle') || t.includes('exercise') || t.includes('sleep')) tags.push({ label: 'Lifestyle', color: '#0ea5e9' });
  if (t.includes('endometriosis')) tags.push({ label: 'Endometriosis', color: '#f59e0b' });
  if (t.includes('cycle') || t.includes('menstrual') || t.includes('period')) tags.push({ label: 'Cycle', color: '#ec4899' });
  if (t.includes('ovulat') || t.includes('fertil')) tags.push({ label: 'Fertility', color: '#8b5cf6' });
  return tags.slice(0, 3);
}

function inferRelated(text) {
  const t = text.toLowerCase();
  const related = [];
  if (t.includes('pcos')) related.push('Hormonal Imbalance', 'Insulin Resistance', 'Fertility');
  if (t.includes('endometriosis')) related.push('Pelvic Pain', 'Fertility', 'Hormonal Therapy');
  if (t.includes('cycle') || t.includes('period')) related.push('Ovulation', 'Hormones', 'Nutrition');
  if (t.includes('hormon')) related.push('PCOS', 'Thyroid Health', 'Adrenal Health');
  if (t.includes('nutrition') || t.includes('diet')) related.push('Iron Deficiency', 'Gut Health', 'Inflammation');
  return [...new Set(related)].slice(0, 5);
}

function ReadingProgress({ text }) {
  const ref = useRef(null);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = ref.current?.closest('.overflow-y-auto');
    if (!el) return;
    const update = () => {
      const rect = ref.current?.getBoundingClientRect();
      const parentRect = el.getBoundingClientRect();
      if (!rect) return;
      const visible = Math.min(rect.bottom, parentRect.bottom) - Math.max(rect.top, parentRect.top);
      const p = Math.max(0, Math.min(100, Math.round((visible / rect.height) * 100)));
      setPct(p);
    };
    el.addEventListener('scroll', update);
    update();
    return () => el.removeEventListener('scroll', update);
  }, []);
  if (pct === 0) return <div ref={ref} />;
  return (
    <div ref={ref} className="mt-2 flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-border)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
      </div>
      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{pct}%</span>
    </div>
  );
}

export default function ChatMessage({ message, onOpenSources, onAsk, savedIds, onToggleSave, explanationMode }) {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const sections = !isUser ? extractSections(message.text) : null;
  const tags = !isUser ? inferTags(message.text) : [];
  const related = !isUser ? inferRelated(message.text) : [];
  const isSaved = savedIds?.includes(message.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(message.text);
    u.onend = u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className={`flex items-end gap-2.5 max-w-3xl mx-auto w-full px-2 animate-fadeIn ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mb-1"
        style={{ background: isUser ? 'var(--accent)' : 'var(--surface)', border: isUser ? 'none' : '1px solid var(--surface-border)' }}>
        {isUser ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />}
      </div>

      <div className="flex-1 max-w-[88%]">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {tags.map(({ label, color }) => (
              <span key={label} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}>
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={isUser
            ? { background: 'var(--accent)', color: '#fff', borderBottomRightRadius: '4px' }
            : { background: 'var(--surface)', border: '1px solid var(--surface-border)', color: 'var(--text-primary)', borderBottomLeftRadius: '4px', backdropFilter: 'blur(12px)' }
          }>

          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : sections ? (
            <div className="space-y-1.5">
              {Object.entries(sections).map(([key, content]) => (
                <div key={key} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--surface-border)' }}>
                  <button onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition"
                    style={{ background: openSections[key] ? 'var(--accent-muted)' : 'transparent', color: openSections[key] ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    <span>{key}</span>
                    {openSections[key] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  {openSections[key] && (
                    <div className="px-3 py-2.5 text-xs prose-gs animate-fadeIn" style={{ color: 'var(--text-secondary)', borderTop: '1px solid var(--surface-border)' }}>
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="prose-gs"><ReactMarkdown>{message.text}</ReactMarkdown></div>
          )}

          {/* Reading Progress */}
          {!isUser && <ReadingProgress text={message.text} />}

          {/* Sources */}
          {!isUser && message.sources?.length > 0 && (
            <div className="mt-3 pt-2.5" style={{ borderTop: '1px solid var(--surface-border)' }}>
              <button onClick={() => setShowSources(s => !s)}
                className="flex items-center gap-1.5 text-xs font-semibold transition"
                style={{ color: 'var(--text-muted)' }}>
                <FileText className="w-3 h-3" />
                <span>Evidence Used ({message.sources.length})</span>
                {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showSources && (
                <div className="mt-2 space-y-1.5 animate-fadeIn">
                  {message.sources.map((src, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl text-xs"
                      style={{ background: 'var(--bg)', border: '1px solid var(--surface-border)' }}>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{src.file}</span>
                      </div>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--purple-muted)', color: 'var(--purple)' }}>p.{src.page}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Related Topics */}
          {!isUser && related.length > 0 && (
            <div className="mt-3 pt-2.5" style={{ borderTop: '1px solid var(--surface-border)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Related Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {related.map((t, i) => (
                  <button key={i} onClick={() => onAsk?.(`Tell me about ${t}`)}
                    className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg transition"
                    style={{ background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                    <ArrowRight className="w-2.5 h-2.5" />
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Row */}
        {!isUser && (
          <div className="flex items-center justify-between mt-1.5 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{message.timestamp}</span>
              <button onClick={handleCopy} className="p-1 rounded transition" style={{ color: copied ? '#22c55e' : 'var(--text-muted)' }} title="Copy">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
              <button onClick={handleSpeak} className="p-1 rounded transition" style={{ color: speaking ? 'var(--accent)' : 'var(--text-muted)' }} title={speaking ? 'Stop' : 'Listen'}>
                {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </button>
              <button onClick={() => onToggleSave?.(message.id, message.text)} className="p-1 rounded transition" title="Save" style={{ color: isSaved ? 'var(--accent)' : 'var(--text-muted)' }}>
                {isSaved ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
              </button>
            </div>

            {/* Feedback */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] mr-1" style={{ color: 'var(--text-muted)' }}>Helpful?</span>
              <button onClick={() => setFeedback('up')} className="p-1 rounded transition"
                style={{ color: feedback === 'up' ? '#22c55e' : 'var(--text-muted)' }} title="Yes">
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button onClick={() => setFeedback('down')} className="p-1 rounded transition"
                style={{ color: feedback === 'down' ? '#ef4444' : 'var(--text-muted)' }} title="No">
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {isUser && (
          <div className="flex justify-end mt-1 px-1">
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{message.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}
