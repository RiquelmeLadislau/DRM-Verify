import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import HistoryView from './components/HistoryView';
import Pricing from './components/Pricing';
import { AppView, HistoryItem } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('drm_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history when it updates
  useEffect(() => {
    localStorage.setItem('drm_history', JSON.stringify(history));
  }, [history]);

  const handleAnalyzeComplete = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('drm_history');
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Hero setView={setCurrentView} />;
      case AppView.ANALYZER:
        return <Analyzer onAnalyzeComplete={handleAnalyzeComplete} />;
      case AppView.HISTORY:
        return <HistoryView history={history} clearHistory={handleClearHistory} />;
      case AppView.PRICING:
        return <Pricing />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DRM Verify. Desenvolvido com Gemini & Search Grounding.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;