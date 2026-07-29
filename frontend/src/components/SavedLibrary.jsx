import React from 'react';
import { X, BookmarkCheck, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function SavedLibrary({ saved, onClose, onRemove }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl p-5 shadow-2xl max-h-[85vh] flex flex-col"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)' }}>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Knowledge Library</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
              {saved.length} saved
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color: 'var(--text-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {saved.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No saved articles yet. Bookmark AI responses to save them here.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {saved.map(({ id, text, timestamp }) => (
              <div key={id} className="p-3.5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{timestamp}</span>
                  <button onClick={() => onRemove(id)} className="p-1 rounded transition" style={{ color: 'var(--text-muted)' }} title="Remove">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-xs prose-gs line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
