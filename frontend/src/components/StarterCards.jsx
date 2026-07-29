import React from 'react';
import ArticleCarousel from './ArticleCarousel';
import TrendingTopics from './TrendingTopics';
import { QuickChips, DidYouKnow, MythFact, RecentlyViewed } from './HomepageExtras';

export default function StarterCards({ onSelectQuestion, recentTopics }) {
  return (
    <div className="max-w-3xl mx-auto w-full py-4 px-2 space-y-5">
      <div className="text-center space-y-1 pt-2">
        <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>How can I help you today?</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Evidence-based guidance for women's reproductive health</p>
      </div>

      {/* Quick Chips */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Quick Questions</span>
        <QuickChips onAsk={onSelectQuestion} />
      </div>

      {/* Carousel + DYK side by side on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ArticleCarousel onAsk={onSelectQuestion} />
        <div className="flex flex-col gap-4">
          <DidYouKnow onAsk={onSelectQuestion} />
          <MythFact />
        </div>
      </div>

      {/* Trending */}
      <TrendingTopics onAsk={onSelectQuestion} />

      {/* Recently Viewed */}
      {recentTopics?.length > 0 && <RecentlyViewed topics={recentTopics} onAsk={onSelectQuestion} />}
    </div>
  );
}
