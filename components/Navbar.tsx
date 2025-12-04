import React from 'react';
import { ShieldCheck, LayoutDashboard, History, CreditCard } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItemClass = (view: AppView) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
      currentView === view
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView(AppView.HOME)}>
            <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              DRM Verify
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setView(AppView.ANALYZER)}
                className={navItemClass(AppView.ANALYZER)}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Analisador</span>
              </button>
              <button
                onClick={() => setView(AppView.HISTORY)}
                className={navItemClass(AppView.HISTORY)}
              >
                <History className="h-4 w-4" />
                <span>Relatórios</span>
              </button>
              <button
                onClick={() => setView(AppView.PRICING)}
                className={navItemClass(AppView.PRICING)}
              >
                <CreditCard className="h-4 w-4" />
                <span>Planos</span>
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
             {/* Mobile menu button (Simplified for this demo) */}
             <button onClick={() => setView(AppView.ANALYZER)} className="text-white p-2">
                <LayoutDashboard />
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;