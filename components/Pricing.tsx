import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Planos para Todo Criador de Conteúdo
        </h2>
        <p className="mt-4 text-xl text-slate-400">
          Garanta que seu conteúdo seja à prova de falhas antes de publicar.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {/* Starter Plan */}
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 flex flex-col p-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">Iniciante</h3>
            <p className="text-slate-400 mt-2">Para verificação ocasional.</p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-white">Grátis</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">3 Análises / mês</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">Pontuação Básica de Confiabilidade</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">Histórico Limitado</span></li>
          </ul>
          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
            Começar Agora
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-800 rounded-2xl shadow-xl border-2 border-indigo-500 flex flex-col p-8 relative transform scale-105 z-10">
          <div className="absolute top-0 right-0 -mt-3 -mr-3">
             <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Popular</span>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">Jornalista Pro</h3>
            <p className="text-indigo-200 mt-2">Para criadores de conteúdo sérios.</p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-white">R$ 29</span>
            <span className="text-slate-400">/mês</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start"><Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0"/> <span className="text-white">Relatórios Ilimitados</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0"/> <span className="text-white">Detecção Profunda de Fake News</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0"/> <span className="text-white">Sugestões Editoriais</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0"/> <span className="text-white">Exportar para PDF</span></li>
          </ul>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/25">
            Assinar Agora
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 flex flex-col p-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">Empresa de Mídia</h3>
            <p className="text-slate-400 mt-2">Para redações e agências.</p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-white">R$ 199</span>
            <span className="text-slate-400">/mês</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">Múltiplos Usuários</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">Acesso à API</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">Gerente de Conta Dedicado</span></li>
            <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2 shrink-0"/> <span className="text-slate-300">Integrações Personalizadas</span></li>
          </ul>
          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
            Falar com Vendas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;