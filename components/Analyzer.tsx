import React, { useState } from 'react';
import { analyzeContent } from '../services/geminiService';
import { AnalysisResult, HistoryItem } from '../types';
import { Loader2, AlertTriangle, CheckCircle, XCircle, Search, ExternalLink } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AnalyzerProps {
  onAnalyzeComplete: (result: HistoryItem) => void;
}

const Analyzer: React.FC<AnalyzerProps> = ({ onAnalyzeComplete }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeContent(text);
      setResult(data);
      
      // Save to history via parent
      const historyItem: HistoryItem = {
        ...data,
        id: crypto.randomUUID(),
        preview: text.substring(0, 100) + '...'
      };
      onAnalyzeComplete(historyItem);

    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e'; // green-500
    if (score >= 50) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const getVerdictLabel = (verdict: string) => {
    switch(verdict) {
      case 'Reliable': return 'Confiável';
      case 'Questionable': return 'Questionável';
      case 'Unreliable': return 'Não Confiável';
      default: return verdict;
    }
  };

  const scoreData = result ? [{ name: 'Score', value: result.score, fill: getScoreColor(result.score) }] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col md:flex-row gap-8">
      
      {/* Input Section */}
      <div className={`flex flex-col transition-all duration-500 ${result ? 'md:w-1/2' : 'w-full md:w-2/3 md:mx-auto'}`}>
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
             <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-400"/> Texto de Entrada
             </h2>
             <span className="text-xs text-slate-500">{text.length} caracteres</span>
          </div>
          <textarea
            className="flex-1 w-full bg-slate-800 p-6 text-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder-slate-500 text-lg leading-relaxed"
            placeholder="Cole seu artigo, post ou notícia aqui para verificar a autenticidade..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="p-4 bg-slate-900 border-t border-slate-700">
            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" /> Verificando com Gemini...
                </>
              ) : (
                'Executar DRM Verify'
              )}
            </button>
            {error && <p className="mt-3 text-center text-red-400 text-sm">{error}</p>}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="md:w-1/2 animate-fadeIn flex flex-col gap-6 overflow-y-auto h-[600px] pr-2 custom-scrollbar">
          
          {/* Score Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex items-center justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             
             <div className="z-10">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Pontuação de Confiabilidade</h3>
                <div className="text-4xl font-bold text-white mb-2">{result.score}/100</div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${
                    result.verdict === 'Reliable' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    result.verdict === 'Questionable' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                    {result.verdict === 'Reliable' && <CheckCircle className="w-4 h-4 mr-2"/>}
                    {result.verdict === 'Questionable' && <AlertTriangle className="w-4 h-4 mr-2"/>}
                    {result.verdict === 'Unreliable' && <XCircle className="w-4 h-4 mr-2"/>}
                    {getVerdictLabel(result.verdict)}
                </div>
             </div>
             
             <div className="h-32 w-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={scoreData} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={30} />
                  </RadialBarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Summary Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Resumo Executivo</h3>
            <p className="text-slate-300 leading-relaxed">{result.summary}</p>
          </div>

          {/* Sources Card (Grounding) */}
          {result.sources.length > 0 && (
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
               <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                 <Search className="w-4 h-4 text-indigo-400" /> Fontes Verificadas
               </h3>
               <ul className="space-y-2">
                 {result.sources.map((source, idx) => (
                   <li key={idx} className="flex items-start gap-2">
                     <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 truncate">
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        {source.title}
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
          )}

          {/* Segments Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Segmentos Sinalizados</h3>
            {result.segments.length === 0 ? (
               <div className="text-center py-8 text-slate-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Nenhuma inconsistência grave detectada.</p>
               </div>
            ) : (
                <div className="space-y-4">
                {result.segments.map((segment, idx) => (
                    <div key={idx} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-red-500/30 transition-colors">
                    <div className="mb-2 pl-3 border-l-2 border-red-500 text-slate-300 italic text-sm">
                        "{segment.quote}"
                    </div>
                    <div className="flex items-start gap-2 mb-2 text-yellow-500 text-sm font-medium">
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{segment.reason}</span>
                    </div>
                    <div className="bg-indigo-500/10 p-3 rounded-lg text-sm text-indigo-200">
                        <span className="font-bold text-indigo-400 block mb-1">Sugestão:</span>
                        {segment.suggestion}
                    </div>
                    </div>
                ))}
                </div>
            )}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Analyzer;