import React from 'react';
import { Dna, Download, Trash2, Menu, BarChart3, Sun, Moon, BookOpen, Bookmark } from 'lucide-react';
import SearchBar from './SearchBar';

const MODES = ['Simple', 'Detailed', 'Medical'];

export default function Header({
  onClearChat, onExportChat, onToggleSidebar, onOpenAnalytics,
  isOnline, isDark, onToggleTheme, messageCount,
  explanationMode, onChangeMode,
  readingMode, onToggleReadingMode,
  onOpenSaved, savedCount,
  onAsk,
}) {
  return (
    <header className="w-full shrink-0 z-30" style={{ borderBottom: '1px solid var(--surface-border)', background: 'var(--bg)' }}>
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="lg:hidden p-1.5 rounded-lg transition" style={{ color: 'var(--text-muted)' }}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-muted)', border: '1px solid var(--accent-border)' }}>
              <Dna className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>GeneScope</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: isOnline ? '#22c55e' : '#ef4444' }} />
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search — hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-xs mx-4">
          <SearchBar onAsk={onAsk} />
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={onOpenAnalytics} title="Health Analytics" className="relative p-2 rounded-xl transition" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
            <BarChart3 className="w-4 h-4" />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                {messageCount > 9 ? '9+' : messageCount}
              </span>
            )}
          </button>

          <button onClick={onOpenSaved} title="Saved articles" className="relative p-2 rounded-xl transition" style={{ color: 'var(--text-muted)' }}>
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: 'var(--purple)' }}>
                {savedCount}
              </span>
            )}
          </button>

          <button onClick={onToggleReadingMode} title="Reading mode" className="p-2 rounded-xl transition" style={{ color: readingMode ? 'var(--accent)' : 'var(--text-muted)', background: readingMode ? 'var(--accent-muted)' : 'transparent' }}>
            <BookOpen className="w-4 h-4" />
          </button>

          <button onClick={onExportChat} title="Export" className="p-2 rounded-xl transition" style={{ color: 'var(--text-muted)' }}>
            <Download className="w-4 h-4" />
          </button>

          <button onClick={onClearChat} title="Clear chat" className="p-2 rounded-xl transition" style={{ color: 'var(--text-muted)' }}>
            <Trash2 className="w-4 h-4" />
          </button>

          <button onClick={onToggleTheme} title="Toggle theme" className="p-2 rounded-xl transition" style={{ color: 'var(--text-muted)' }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Explanation Mode Row */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Mode:</span>
        <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
          {MODES.map(m => (
            <button key={m} onClick={() => onChangeMode(m)}
              className="px-2.5 py-1 rounded-md text-[10px] font-semibold transition"
              style={{
                background: explanationMode === m ? 'var(--accent)' : 'transparent',
                color: explanationMode === m ? '#fff' : 'var(--text-muted)',
              }}>
              {m}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
