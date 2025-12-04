import React from 'react';
import { HistoryItem } from '../types';
import { Clock, Trash2, ChevronRight, FileText } from 'lucide-react';

interface HistoryViewProps {
  history: HistoryItem[];
  clearHistory: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, clearHistory }) => {
  const getVerdictLabel = (verdict: string) => {
    switch(verdict) {
      case 'Reliable': return 'Confiável';
      case 'Questionable': return 'Questionável';
      case 'Unreliable': return 'Não Confiável';
      default: return verdict;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Clock className="w-8 h-8 text-indigo-500" />
          Histórico de Relatórios
        </h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" /> Limpar Tudo
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700 border-dashed">
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300">Nenhum relatório ainda</h3>
          <p className="text-slate-500 mt-2">Execute uma análise para ver seu histórico aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      item.verdict === 'Reliable' ? 'bg-green-500/20 text-green-400' :
                      item.verdict === 'Unreliable' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {getVerdictLabel(item.verdict)}
                    </span>
                    <span className="text-slate-500 text-xs">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-300 line-clamp-2 mb-2">"{item.preview}"</p>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>{item.segments.length} pontos de atenção</span>
                    <span>•</span>
                    <span>Pontuação: {item.score}/100</span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                   <div className="text-right mr-6 hidden md:block">
                     <div className="text-2xl font-bold text-white">{item.score}</div>
                     <div className="text-xs text-slate-500">Confiabilidade</div>
                   </div>
                   <button className="p-2 rounded-full bg-slate-700 text-white group-hover:bg-indigo-600 transition-colors">
                     <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;