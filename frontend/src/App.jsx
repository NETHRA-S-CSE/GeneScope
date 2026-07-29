import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DisclaimerBanner from './components/DisclaimerBanner';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import SourcesModal from './components/SourcesModal';
import StarterCards from './components/StarterCards';
import SymptomTrackerWidget from './components/SymptomTrackerWidget';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SavedLibrary from './components/SavedLibrary';
import { sendMessage, fetchHealth } from './services/api';
import { Send, Mic, MicOff, Loader2, Sparkles, MessageCircle, X } from 'lucide-react';

const MODE_SUFFIX = {
  Simple: ' Explain in simple, easy-to-understand language.',
  Detailed: '',
  Medical: ' Use clinical and medical terminology in your explanation.',
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [activeSources, setActiveSources] = useState(null);
  const [activeTopic, setActiveTopic] = useState('pcos');
  const [isListening, setIsListening] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [explanationMode, setExplanationMode] = useState('Detailed');
  const [readingMode, setReadingMode] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [recentTopics, setRecentTopics] = useState([]);
  const [showFloating, setShowFloating] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); }, [isDark]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);
  useEffect(() => { fetchHealth().then(h => setIsBackendOnline(h.status !== 'offline')); }, []);

  // Show floating button only when there are messages (user scrolled away from input)
  useEffect(() => { setShowFloating(messages.length > 3); }, [messages]);

  const handleVoiceInput = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input not supported.'); return; }
    if (isListening) { setIsListening(false); return; }
    const r = new SR();
    r.lang = 'en-US';
    r.onstart = () => setIsListening(true);
    r.onresult = (e) => { setInputQuery(e.results[0][0].transcript); setIsListening(false); };
    r.onerror = r.onend = () => setIsListening(false);
    r.start();
  };

  const handleSend = async (queryText = inputQuery) => {
    const raw = typeof queryText === 'string' ? queryText.trim() : inputQuery.trim();
    if (!raw || isLoading) return;

    const text = raw + MODE_SUFFIX[explanationMode];

    // Track recently viewed
    setRecentTopics(prev => [raw, ...prev.filter(t => t !== raw)].slice(0, 6));

    const userMsg = {
      id: Date.now().toString(), sender: 'user', text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await sendMessage(text);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), sender: 'ai',
        text: res.answer, sources: res.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), sender: 'ai',
        text: `**Connection Error**: ${err.message || 'Make sure the backend is running at port 8000.'}`,
        sources: [], timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation?')) setMessages([]);
  };

  const handleExportChat = () => {
    if (!messages.length) return;
    const blob = new Blob([messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n---\n\n')], { type: 'text/plain' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `genescope-${Date.now()}.txt` });
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleToggleSave = (id, text) => {
    setSavedMessages(prev => {
      const exists = prev.find(s => s.id === id);
      if (exists) return prev.filter(s => s.id !== id);
      const msg = messages.find(m => m.id === id);
      return [...prev, { id, text, timestamp: msg?.timestamp || '' }];
    });
  };

  const savedIds = savedMessages.map(s => s.id);

  // Reading mode styles
  const mainContentStyle = readingMode
    ? { maxWidth: '720px', margin: '0 auto', fontSize: '15px', lineHeight: '1.9' }
    : {};

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      {!readingMode && (
        <Header
          onClearChat={handleClearChat}
          onExportChat={handleExportChat}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenAnalytics={() => setAnalyticsOpen(true)}
          isOnline={isBackendOnline}
          isDark={isDark}
          onToggleTheme={() => setIsDark(d => !d)}
          messageCount={messages.filter(m => m.sender === 'user').length}
          explanationMode={explanationMode}
          onChangeMode={setExplanationMode}
          readingMode={readingMode}
          onToggleReadingMode={() => setReadingMode(r => !r)}
          onOpenSaved={() => setSavedOpen(true)}
          savedCount={savedMessages.length}
          onAsk={handleSend}
        />
      )}

      {readingMode && (
        <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ borderBottom: '1px solid var(--surface-border)', background: 'var(--bg)' }}>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Reading Mode</span>
          <button onClick={() => setReadingMode(false)} className="p-1.5 rounded-lg" style={{ color: 'var(--text-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <DisclaimerBanner />

      <div className="flex-1 min-h-0 flex overflow-hidden">
        {!readingMode && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSelectPrompt={handleSend}
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden" style={readingMode ? { background: 'var(--bg)' } : {}}>
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-2 flex flex-col" style={mainContentStyle}>
            {messages.length === 0
              ? <StarterCards onSelectQuestion={handleSend} recentTopics={recentTopics} />
              : messages.map(msg => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onOpenSources={setActiveSources}
                    onAsk={handleSend}
                    savedIds={savedIds}
                    onToggleSave={handleToggleSave}
                    explanationMode={explanationMode}
                  />
                ))
            }

            {isLoading && (
              <div className="flex items-center gap-3 max-w-3xl mx-auto w-full px-2 animate-fadeIn">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-muted)', border: '1px solid var(--accent-border)' }}>
                  <Sparkles className="w-4 h-4 animate-spin" style={{ color: 'var(--accent)', animationDuration: '3s' }} />
                </div>
                <div className="glass px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: 'var(--accent)' }} />
                  <span>Analyzing your question…</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {!readingMode && (
            <div className="px-4 pb-1 flex justify-end max-w-3xl mx-auto w-full">
              <SymptomTrackerWidget onAskAboutSymptoms={handleSend} />
            </div>
          )}

          <div className="px-4 pb-4 pt-2" style={{ borderTop: '1px solid var(--surface-border)' }}>
            <div className="max-w-3xl mx-auto flex items-center gap-2" style={readingMode ? { maxWidth: '720px' } : {}}>
              <textarea
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about PCOS, period pain, ovulation, nutrition…"
                rows={1}
                className="flex-1 px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none transition"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-primary)',
                  backdropFilter: 'blur(12px)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
                onBlur={e => e.target.style.borderColor = 'var(--surface-border)'}
              />
              <button onClick={handleVoiceInput} className="p-3 rounded-xl transition"
                style={{ background: isListening ? 'var(--accent)' : 'var(--surface)', border: '1px solid var(--surface-border)', color: isListening ? '#fff' : 'var(--text-muted)' }}>
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button onClick={() => handleSend()} disabled={!inputQuery.trim() || isLoading}
                className="p-3 rounded-xl transition disabled:opacity-40"
                style={{ background: 'var(--accent)', color: '#fff' }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Ask AI Button */}
      {showFloating && !readingMode && (
        <button
          onClick={() => { document.querySelector('textarea')?.focus(); }}
          className="fixed bottom-24 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl text-sm font-semibold transition hover:scale-105 animate-fadeIn"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          <MessageCircle className="w-4 h-4" />
          <span>Ask AI</span>
        </button>
      )}

      {activeSources && <SourcesModal sources={activeSources} onClose={() => setActiveSources(null)} />}
      <AnalyticsDashboard messages={messages} isOpen={analyticsOpen} onClose={() => setAnalyticsOpen(false)} />
      {savedOpen && <SavedLibrary saved={savedMessages} onClose={() => setSavedOpen(false)} onRemove={id => setSavedMessages(p => p.filter(s => s.id !== id))} />}
    </div>
  );
}
