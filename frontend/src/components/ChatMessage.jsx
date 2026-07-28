import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Bot, 
  User, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink 
} from 'lucide-react';

export default function ChatMessage({ message, onOpenSources }) {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showSourcesList, setShowSourcesList] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(message.text);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
      }
    }
  };

  return (
    <div className={`flex items-start space-x-3 sm:space-x-4 my-4 max-w-4xl mx-auto px-2 sm:px-0 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar Icon */}
      <div className={`
        flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg
        ${isUser 
          ? 'bg-gradient-to-tr from-[#ff2d75] via-[#ff4d8d] to-[#c77dff] text-white shadow-cyra-glow' 
          : 'bg-gradient-to-tr from-[#1a0b33] to-[#34165d] border border-[#ff2d75]/50 text-[#ff4d8d] shadow-cyra-glow'
        }
      `}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-[#ff4d8d]" />}
      </div>

      {/* Message Content Bubble */}
      <div className={`
        flex-1 rounded-2xl p-4 sm:p-5 text-sm leading-relaxed transition-all duration-200
        ${isUser 
          ? 'bg-gradient-to-r from-[#ff2d75] to-[#9d4edf] text-white rounded-tr-none shadow-cyra-glow ml-8 sm:ml-12 font-medium' 
          : 'glass-panel bg-[#150a2b]/85 text-purple-50 rounded-tl-none border-[#ff2d75]/30 shadow-cyra-card mr-4 sm:mr-8'
        }
      `}>
        {/* Sender Header */}
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/10 text-xs">
          <span className="font-semibold text-gray-200 flex items-center space-x-1.5">
            <span>{isUser ? 'You' : 'GeneScope Health AI'}</span>
            {!isUser && (
              <span className="bg-[#ff2d75]/20 text-[#ff4d8d] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#ff2d75]/40 shadow-sm">
                Verified Health Info
              </span>
            )}
          </span>
          <span className="text-[11px] text-purple-300/60">
            {message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Message Body */}
        <div className="prose-cyra overflow-x-auto">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <ReactMarkdown>{message.text}</ReactMarkdown>
          )}
        </div>

        {/* Medical Literature Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSourcesList(!showSourcesList)}
                className="flex items-center space-x-1.5 text-xs font-semibold text-[#ff4d8d] hover:text-white transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Medical References ({message.sources.length})</span>
                {showSourcesList ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                onClick={() => onOpenSources(message.sources)}
                className="text-[11px] text-[#c77dff] hover:underline flex items-center space-x-1 font-medium"
              >
                <span>View References</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Expandable Sources List */}
            {showSourcesList && (
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.sources.map((src, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-[#ff4d8d] flex-shrink-0" />
                      <span className="font-medium text-gray-200 truncate">{src.file}</span>
                    </div>
                    <span className="bg-[#c77dff]/20 text-[#c77dff] text-[10px] px-1.5 py-0.5 rounded font-mono flex-shrink-0 ml-1 border border-[#c77dff]/30">
                      Page {src.page}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Message Actions */}
        {!isUser && (
          <div className="mt-3 pt-2 flex items-center justify-end space-x-2 text-xs text-gray-400">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition flex items-center space-x-1"
              title="Copy message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition flex items-center space-x-1 ${speaking ? 'text-[#ff4d8d]' : ''}`}
              title={speaking ? "Stop speaking" : "Listen to answer"}
            >
              {speaking ? <VolumeX className="w-3.5 h-3.5 text-[#ff4d8d]" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{speaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
