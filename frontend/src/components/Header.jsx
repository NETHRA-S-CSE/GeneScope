import React from 'react';
import { Dna, Heart, Download, Trash2, Menu, BarChart3 } from 'lucide-react';

export default function Header({ onClearChat, onExportChat, onToggleSidebar, onOpenAnalytics, isOnline, messageCount }) {
  return (
    <header className="w-full shrink-0 bg-[#0e071c]/95 border-b border-[#ff2d75]/30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-cyra-glow relative z-30 backdrop-blur-xl">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="shrink-0 flex items-center justify-center w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-[#ff2d75] via-[#ff4d8d] to-[#c77dff] p-0.5 shadow-cyra-glow">
          <div className="w-full h-full bg-[#0a0512] rounded-[10px] flex items-center justify-center">
            <Dna className="w-4.5 h-4.5 text-[#ff4d8d] animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2 leading-none">
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-[#ff4d8d] to-[#c77dff] bg-clip-text text-transparent drop-shadow-sm">
              GeneScope
            </span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff2d75]/20 text-[#ff4d8d] border border-[#ff2d75]/40 shadow-sm">
              <Heart className="w-2.5 h-2.5 mr-1 text-[#ff2d75] fill-current animate-pulse" />
              Women's Health AI
            </span>
          </div>
          <p className="text-[11px] text-purple-200/70 font-medium mt-1 hidden sm:block leading-tight">
            Empathetic Companion for Period Health & Reproductive Wellness
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-2">
        {/* Live Analytics Button */}
        <button
          onClick={onOpenAnalytics}
          title="Open My Health Analytics"
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-[#c77dff] hover:text-white bg-[#c77dff]/15 hover:bg-[#c77dff]/25 border border-[#c77dff]/40 rounded-xl transition duration-200 shadow-cyra-purple relative"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#c77dff]" />
          <span>My Health Analytics</span>
          {messageCount > 0 && (
            <span className="ml-1 w-4 h-4 rounded-full bg-[#ff2d75] text-white text-[10px] flex items-center justify-center font-bold font-mono">
              {messageCount}
            </span>
          )}
        </button>

        {/* Export Button */}
        <button
          onClick={onExportChat}
          title="Export Conversation"
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-[#ff2d75]/20 border border-white/10 hover:border-[#ff2d75]/40 rounded-xl transition duration-200"
        >
          <Download className="w-3.5 h-3.5 text-[#ff4d8d]" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Clear Button */}
        <button
          onClick={onClearChat}
          title="Clear Chat History"
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-red-300 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl transition duration-200"
        >
          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </header>
  );
}
