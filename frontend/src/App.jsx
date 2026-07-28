import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DisclaimerBanner from './components/DisclaimerBanner';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import SourcesModal from './components/SourcesModal';
import StarterCards from './components/StarterCards';
import SymptomTrackerWidget from './components/SymptomTrackerWidget';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { sendMessage, fetchHealth } from './services/api';
import { 
  Send, 
  Mic, 
  MicOff, 
  Loader2, 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  Database,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [activeSources, setActiveSources] = useState(null);
  const [activeTopic, setActiveTopic] = useState('pcos');
  const [isListening, setIsListening] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [apiError, setApiError] = useState(null);

  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Check Backend Health on Mount
  useEffect(() => {
    async function checkHealth() {
      const health = await fetchHealth();
      if (health.status === 'offline') {
        setIsBackendOnline(false);
      } else {
        setIsBackendOnline(true);
      }
    }
    checkHealth();
  }, []);

  // Voice Input Speech Recognition Setup
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // Submit Question to RAG Backend
  const handleSend = async (queryText = inputQuery) => {
    const textToSend = typeof queryText === 'string' ? queryText.trim() : inputQuery.trim();
    if (!textToSend || isLoading) return;

    setApiError(null);

    // Create User Message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await sendMessage(textToSend);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.answer,
        sources: response.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Failed to reach backend server.");

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ **Connection Error**: Unable to reach GeneScope health service.\n\n*Error details*: ${err.message || 'Make sure the backend Python server is running at port 8000.'}`,
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([]);
      setApiError(null);
    }
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;
    const exportData = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n---\n\n');
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genescope-chat-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const userQueryCount = messages.filter(m => m.sender === 'user').length;

  return (
    <div className="h-screen max-h-screen w-screen bg-[#0a0512] text-[#f8f9fa] flex flex-col overflow-hidden font-sans selection:bg-[#ff2d75] selection:text-white">
      {/* Background Glowing Ambient Orbs - CyraSync Hot Glowing Mesh */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-[#ff2d75]/25 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[32rem] h-[32rem] bg-[#7b2cbf]/25 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[26rem] h-[26rem] bg-[#c77dff]/15 rounded-full blur-[120px]" />

      {/* 1. Header Bar */}
      <Header 
        onClearChat={handleClearChat}
        onExportChat={handleExportChat}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        isOnline={isBackendOnline}
        messageCount={userQueryCount}
      />

      {/* 2. Medical Safety Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 3. Inline Live Women's Period Health Analytics Strip */}
      <div className="w-full shrink-0 bg-gradient-to-r from-[#170a2a]/95 via-[#230d3d]/95 to-[#170a2a]/95 border-b border-[#ff2d75]/35 backdrop-blur-md px-4 py-1.5 text-xs text-purple-100 shadow-inner">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto custom-scrollbar py-0.5">
            <span className="flex items-center space-x-1.5 text-purple-200 font-semibold shrink-0">
              <BarChart3 className="w-3.5 h-3.5 text-[#ff4d8d]" />
              <span>Period Health Summary:</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-200 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#ff2d75] animate-pulse shadow-cyra-glow"></span>
              <span>Phase: <strong className="text-white font-semibold">Day 14 (Ovulation Window)</strong></span>
            </span>
            <span className="flex items-center space-x-1 text-purple-200 shrink-0">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Status: <strong className="text-emerald-400 font-semibold">Balanced Wellness</strong></span>
            </span>
            <span className="flex items-center space-x-1 text-purple-200 shrink-0">
              <Database className="w-3 h-3 text-[#c77dff]" />
              <span>Cycle Avg: <strong className="text-white">28 Days</strong></span>
            </span>
          </div>

          <button
            onClick={() => setAnalyticsOpen(true)}
            className="text-[11px] text-[#ff4d8d] hover:text-white font-bold flex items-center space-x-1 shrink-0 ml-2"
          >
            <span>My Cycle Analytics</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 4. Main Workspace */}
      <div className="flex-1 min-h-0 flex overflow-hidden relative z-10">
        {/* Knowledge Base Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSelectPrompt={(promptText) => handleSend(promptText)}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
        />

        {/* Central Chat View */}
        <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
          
          {/* Scrollable Conversation Area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 custom-scrollbar space-y-4 flex flex-col">
            {messages.length === 0 ? (
              <StarterCards onSelectQuestion={(q) => handleSend(q)} />
            ) : (
              messages.map(msg => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg} 
                  onOpenSources={(srcs) => setActiveSources(srcs)} 
                />
              ))
            )}

            {/* Loading Indicator Pill */}
            {isLoading && (
              <div className="flex items-center space-x-3 max-w-4xl mx-auto my-3 px-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1a0b33] to-[#34165d] border border-[#ff2d75]/50 text-[#ff4d8d] flex items-center justify-center shadow-cyra-glow">
                  <Sparkles className="w-4 h-4 animate-spin text-[#ff4d8d]" style={{ animationDuration: '3s' }} />
                </div>
                <div className="glass-panel bg-[#150a2b]/90 px-3.5 py-2.5 rounded-2xl rounded-tl-none text-xs text-purple-100 flex items-center space-x-2 border-[#ff2d75]/40 shadow-cyra-glow">
                  <Loader2 className="w-3.5 h-3.5 text-[#ff4d8d] animate-spin" />
                  <span>GeneScope is carefully analyzing your health question...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Floating Symptom Checker Widget */}
          <div className="px-4 py-0.5 flex justify-end max-w-4xl mx-auto w-full">
            <SymptomTrackerWidget onAskAboutSymptoms={(query) => handleSend(query)} />
          </div>

          {/* Input Dock */}
          <div className="p-3 sm:p-4 glass-panel border-t border-[#ff2d75]/35 bg-[#0a0512]/95 backdrop-blur-2xl shrink-0 shadow-cyra-glow">
            <div className="max-w-4xl mx-auto relative flex items-center">
              
              <textarea
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask GeneScope about PCOS symptoms, period pain relief, ovulation, or nutrition..."
                rows={1}
                className="w-full pl-4 pr-24 py-3 rounded-2xl bg-[#170a2c]/95 border border-[#ff2d75]/40 focus:border-[#ff2d75] text-white placeholder-purple-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d75]/30 transition shadow-inner resize-none font-medium"
              />

              <div className="absolute right-2 flex items-center space-x-1.5">
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-xl transition ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-purple-300 hover:text-white hover:bg-white/10'}`}
                  title={isListening ? "Listening..." : "Speak question"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim() || isLoading}
                  className="p-2 rounded-xl bg-gradient-to-tr from-[#ff2d75] via-[#ff4d8d] to-[#c77dff] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-cyra-glow hover:scale-105 transition duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-1.5 text-center text-[10px] text-purple-300/70 flex items-center justify-between px-2">
              <span className="hidden sm:inline font-medium">GeneScope Women's Reproductive Health Companion</span>
              <button 
                onClick={() => setAnalyticsOpen(true)}
                className="text-[#ff4d8d] hover:underline font-bold text-[10px] flex items-center space-x-1"
              >
                <span>🌸 Personal Cycle Analytics & Health Insights</span>
              </button>
            </div>
          </div>

        </main>
      </div>

      {/* Sources Citation Dialog Modal */}
      {activeSources && (
        <SourcesModal 
          sources={activeSources} 
          onClose={() => setActiveSources(null)} 
        />
      )}

      {/* Analytics Dashboard Modal */}
      <AnalyticsDashboard 
        messages={messages}
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
    </div>
  );
}
